
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'submission_created' | 'status_updated';
  submissionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, submissionId }: NotificationRequest = await req.json();
    
    console.log(`Sending ${type} notification for submission ${submissionId}`);
    
    // Initialize Supabase client to fetch submission data
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Fetch submission data first
    const { data: submission, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError || !submission) {
      console.error('Error fetching submission:', fetchError);
      return new Response(
        JSON.stringify({ error: "Submission not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Fetch user profile data separately using the user_id from submission
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, email, phone')
      .eq('id', submission.user_id)
      .single();

    if (profileError || !userProfile) {
      console.error('Error fetching user profile:', profileError);
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const resend = new Resend(resendApiKey);
    
    // Use profile data for personalization
    const userName = userProfile.full_name || 'Valued Client';
    const userEmail = userProfile.email || submission.email;
    
    let subject = "";
    let htmlContent = "";
    
    switch (type) {
      case 'submission_created':
        subject = "Project Submission Received - Portal";
        htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Confirmation - Portal Interior Design</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: rgb(250, 248, 245);
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.9) 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 3px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .tagline {
            font-size: 12px;
            opacity: 0.8;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: rgb(139, 157, 131);
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .highlight {
            font-weight: 600;
            color: rgb(139, 157, 131);
        }
        
        .project-details {
            background-color: rgb(250, 248, 245);
            border-left: 4px solid rgb(139, 157, 131);
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .project-details h3 {
            font-size: 18px;
            font-weight: 600;
            color: rgb(139, 157, 131);
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .detail-item:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 500;
            color: #666;
            flex: 1;
        }
        
        .detail-value {
            font-weight: 600;
            color: rgb(139, 157, 131);
            text-align: right;
            flex: 1;
        }
        
        .style-vision {
            background: linear-gradient(135deg, rgb(250, 248, 245) 0%, rgba(250, 248, 245, 0.8) 100%);
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid rgba(139, 157, 131, 0.3);
        }
        
        .style-vision h4 {
            font-size: 14px;
            font-weight: 600;
            color: rgb(139, 157, 131);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .style-vision p {
            font-style: italic;
            color: #555;
            font-size: 15px;
        }
        
        .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.8) 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.9) 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(139, 157, 131, 0.3), transparent);
            margin: 30px 0;
        }
        
        .footer {
            background-color: rgb(139, 157, 131);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-size: 20px;
            font-weight: 300;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        
        .footer-text {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        
        .footer-contact {
            font-size: 13px;
            opacity: 0.7;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .project-details {
                padding: 20px;
                margin: 20px 0;
            }
            
            .detail-item {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px 0;
            }
            
            .detail-value {
                text-align: left;
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">PORTAL</div>
            <div class="tagline">by CreoDesigns</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1 class="greeting">Thank you for your submission, ${userName}!</h1>
            
            <div class="message">
                We have received your <span class="highlight">${submission.service_type}</span> project inquiry and will get back to you within <span class="highlight">2 business days</span>.
                <br><br>
                You can track the progress of your submission in your dashboard.
            </div>
            
            <!-- Project Details -->
            <div class="project-details">
                <h3>Project Details</h3>
                
                <div class="detail-item">
                    <span class="detail-label">Project Name:</span>
                    <span class="detail-value">${submission.project_name || 'Not specified'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Project Type:</span>
                    <span class="detail-value">${submission.project_type || 'Not specified'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Service Type:</span>
                    <span class="detail-value">${submission.service_type}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Preferred Style:</span>
                    <span class="detail-value">${submission.preferred_style || 'Not specified'}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value"><span class="status-badge">${submission.status}</span></span>
                </div>
            </div>
            
            ${submission.style_description ? `
            <!-- Style Vision -->
            <div class="style-vision">
                <h4>Style Vision</h4>
                <p>"${submission.style_description}"</p>
            </div>
            ` : ''}
            
            <div class="divider"></div>
            
            <!-- Call to Action -->
            <div class="cta-section">
                <a href="#" class="cta-button">View Dashboard</a>
            </div>
            
            <div class="message" style="margin-top: 30px; text-align: center; color: #666;">
                Best regards,<br>
                <span style="font-weight: 600; color: rgb(139, 157, 131);">The Portal Team</span>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">PORTAL</div>
            <div class="footer-text">by CreoDesigns - Bespoke Interior Design Service</div>
            <div class="footer-contact">
                portal@creodesigns.eu | +1 (555) 123-4567<br>
                © 2024 PORTAL by CreoDesigns. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
        `;
        break;
      case 'status_updated':
        subject = "Project Status Update - Portal";
        htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status Update - Portal Interior Design</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: rgb(250, 248, 245);
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.9) 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 3px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        
        .tagline {
            font-size: 12px;
            opacity: 0.8;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: rgb(139, 157, 131);
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .highlight {
            font-weight: 600;
            color: rgb(139, 157, 131);
        }
        
        .status-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.8) 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, rgb(139, 157, 131) 0%, rgba(139, 157, 131, 0.9) 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .footer {
            background-color: rgb(139, 157, 131);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-size: 20px;
            font-weight: 300;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        
        .footer-text {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        
        .footer-contact {
            font-size: 13px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">PORTAL</div>
            <div class="tagline">by CreoDesigns</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1 class="greeting">Project Status Update</h1>
            
            <div class="message">
                Dear ${userName},
                <br><br>
                Your <span class="highlight">${submission.project_name || submission.service_type}</span> project status has been updated to: <span class="status-badge">${submission.status}</span>.
                <br><br>
                You can view the details in your dashboard.
            </div>
            
            <!-- Call to Action -->
            <div class="cta-section">
                <a href="#" class="cta-button">View Dashboard</a>
            </div>
            
            <div class="message" style="margin-top: 30px; text-align: center; color: #666;">
                Best regards,<br>
                <span style="font-weight: 600; color: rgb(139, 157, 131);">The Portal Team</span>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">PORTAL</div>
            <div class="footer-text">by CreoDesigns - Bespoke Interior Design Service</div>
            <div class="footer-contact">
                portal@creodesigns.eu | +1 (555) 123-4567<br>
                © 2024 PORTAL by CreoDesigns. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
        `;
        break;
    }

    console.log("Sending email to:", userEmail);

    const emailResponse = await resend.emails.send({
      from: "Portal <portal@creodesigns.eu>",
      to: [userEmail],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification sent successfully",
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

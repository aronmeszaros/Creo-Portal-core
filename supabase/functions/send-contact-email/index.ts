
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const { name, email, message, turnstileToken }: ContactFormRequest = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify security check
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: "Please complete the security check" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Handle fallback verification (checkbox)
    if (turnstileToken === "fallback-verification-token") {
      console.log("Using fallback verification method");
    } else {
      // Validate Turnstile token with Cloudflare
      const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
      
      if (turnstileSecret) {
        try {
          const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${turnstileSecret}&response=${turnstileToken}`,
          });

          const turnstileResult = await turnstileResponse.json();
          console.log("Turnstile verification result:", turnstileResult);

          if (!turnstileResult.success) {
            return new Response(
              JSON.stringify({ error: "Security check failed. Please try again." }),
              {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders },
              }
            );
          }
        } catch (turnstileError) {
          console.error("Turnstile verification error:", turnstileError);
          // Continue with fallback if Turnstile verification fails
          console.log("Continuing with fallback verification due to Turnstile error");
        }
      } else {
        console.log("No Turnstile secret key found, using fallback verification");
      }
    }

    // Send email to aron@meszaros.online using portal@creodesigns.eu
    const emailResponse = await resend.emails.send({
      from: "Portal Contact Form <portal@creodesigns.eu>",
      to: ["aron@meszaros.online"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748; border-bottom: 2px solid #a8b5a0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #2d3748; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #718096;">
            <p>This message was sent through the Portal by CreoDesigns contact form.</p>
            <p style="font-size: 12px; color: #a0aec0;">
              Security verification: ${turnstileToken === "fallback-verification-token" ? "Checkbox verification" : "Turnstile verification"}
            </p>
          </div>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      throw new Error(emailResponse.error.message || "Failed to send email");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully!" 
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
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send message. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

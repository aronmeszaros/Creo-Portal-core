
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateDesignerRequest {
  name: string;
  email: string;
  specialization?: string;
  description?: string;
  years_experience?: number;
}

// Helper function to generate a random password
const generateTempPassword = () => {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting designer account creation process');
    const designerData: CreateDesignerRequest = await req.json();
    
    // Get Supabase configuration from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Admin client created successfully');

    // Step 1: Create the designer record using admin client to bypass RLS
    const { data: designerRecord, error: designerError } = await adminClient
      .from('designers')
      .insert([designerData])
      .select()
      .single();

    if (designerError) {
      console.error('Error creating designer record:', designerError);
      throw designerError;
    }

    console.log('Designer record created:', designerRecord.id);

    // Step 2: Generate temporary password
    const tempPassword = generateTempPassword();
    console.log('Generated temporary password for designer');

    // Step 3: Create auth user using admin client with role in metadata
    const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
      email: designerData.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: designerData.name,
        temp_password: tempPassword,
        role: 'designer'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      // Clean up designer record if auth user creation fails
      await adminClient.from('designers').delete().eq('id', designerRecord.id);
      throw authError;
    }

    console.log('Auth user created:', authUser.user?.id);
    console.log('Profile automatically created with designer role via trigger');

    // Step 4: Link designer to user account using admin client
    const { error: linkError } = await adminClient
      .from('designer_accounts')
      .insert({
        designer_id: designerRecord.id,
        user_id: authUser.user.id
      });

    if (linkError) {
      console.error('Error linking designer account:', linkError);
      // Clean up previous records if linking fails
      await adminClient.auth.admin.deleteUser(authUser.user.id);
      await adminClient.from('designers').delete().eq('id', designerRecord.id);
      throw linkError;
    }

    console.log('Designer account linked successfully');

    // Step 5: Store password in designer_passwords table
    const { error: passwordError } = await adminClient
      .from('designer_passwords')
      .insert({
        designer_id: designerRecord.id,
        password: tempPassword,
        notes: `Created for ${designerData.name} (${designerData.email})`
      });

    if (passwordError) {
      console.error('Error storing designer password:', passwordError);
      // Don't fail the entire process for this, just log the error
      console.error('Password storage failed but designer account was created successfully');
    } else {
      console.log('Designer password stored successfully');
    }

    return new Response(JSON.stringify({
      success: true,
      designer: designerRecord,
      tempPassword,
      userId: authUser.user.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in create-designer-account function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};

serve(handler);

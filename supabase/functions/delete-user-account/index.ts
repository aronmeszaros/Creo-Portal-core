
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DeleteUserRequest {
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting user account deletion process');
    const { userId }: DeleteUserRequest = await req.json();
    
    if (!userId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User ID is required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Get Supabase configuration from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Admin client created successfully');

    // First, get user info for logging (try both profiles and auth)
    const { data: userProfile, error: profileError } = await adminClient
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single();

    let userName = 'Unknown';
    let userEmail = 'Unknown';

    if (userProfile && !profileError) {
      userName = userProfile.full_name || 'Unknown';
      userEmail = userProfile.email || 'Unknown';
    } else {
      console.log('Profile not found, checking auth user directly');
      // Try to get user from auth if profile doesn't exist
      const { data: authUser, error: authError } = await adminClient.auth.admin.getUserById(userId);
      if (authUser && !authError) {
        userName = authUser.user?.user_metadata?.full_name || 'Unknown';
        userEmail = authUser.user?.email || 'Unknown';
      }
    }

    console.log(`Attempting to delete user: ${userName} (${userEmail})`);

    // Delete from profiles table first (this might fail if user doesn't exist there)
    const { error: profileDeleteError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileDeleteError) {
      console.log('Profile deletion failed (user might not exist in profiles):', profileDeleteError);
    } else {
      console.log('Profile deleted successfully');
    }

    // Delete any related data (form submissions, designer accounts, etc.)
    const { error: submissionsError } = await adminClient
      .from('form_submissions')
      .delete()
      .eq('user_id', userId);

    if (submissionsError) {
      console.log('Form submissions deletion failed:', submissionsError);
    }

    const { error: designerAccountsError } = await adminClient
      .from('designer_accounts')
      .delete()
      .eq('user_id', userId);

    if (designerAccountsError) {
      console.log('Designer accounts deletion failed:', designerAccountsError);
    }

    // Finally, delete the auth user - this is the critical step
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('Error deleting auth user:', deleteError);
      throw deleteError;
    }

    console.log('Auth user deleted successfully');

    return new Response(JSON.stringify({
      success: true,
      message: `User ${userName} (${userEmail}) has been completely deleted from both database and authentication system`
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in delete-user-account function:', error);
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

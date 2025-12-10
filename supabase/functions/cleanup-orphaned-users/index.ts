
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting orphaned users cleanup process');
    
    // Get Supabase configuration from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    console.log('Admin client created successfully');

    // Get all auth users
    const { data: authUsers, error: authError } = await adminClient.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Failed to fetch auth users: ${authError.message}`);
    }

    // Get all profile users
    const { data: profileUsers, error: profileError } = await adminClient
      .from('profiles')
      .select('id, email, full_name');

    if (profileError) {
      throw new Error(`Failed to fetch profile users: ${profileError.message}`);
    }

    const profileUserIds = new Set(profileUsers.map(p => p.id));
    const orphanedUsers = authUsers.users.filter(authUser => !profileUserIds.has(authUser.id));

    console.log(`Found ${orphanedUsers.length} orphaned auth users`);

    const report = {
      total_auth_users: authUsers.users.length,
      total_profile_users: profileUsers.length,
      orphaned_count: orphanedUsers.length,
      orphaned_users: orphanedUsers.map(user => ({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at
      }))
    };

    // If cleanup is requested
    if (req.method === 'DELETE') {
      console.log('Deleting orphaned users...');
      
      const deletionResults = [];
      
      for (const orphanedUser of orphanedUsers) {
        try {
          const { error: deleteError } = await adminClient.auth.admin.deleteUser(orphanedUser.id);
          if (deleteError) {
            deletionResults.push({
              id: orphanedUser.id,
              email: orphanedUser.email,
              success: false,
              error: deleteError.message
            });
          } else {
            deletionResults.push({
              id: orphanedUser.id,
              email: orphanedUser.email,
              success: true
            });
          }
        } catch (error: any) {
          deletionResults.push({
            id: orphanedUser.id,
            email: orphanedUser.email,
            success: false,
            error: error.message
          });
        }
      }

      return new Response(JSON.stringify({
        success: true,
        message: `Cleanup completed. Processed ${orphanedUsers.length} orphaned users.`,
        report,
        deletion_results: deletionResults
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Just return the report for GET requests
    return new Response(JSON.stringify({
      success: true,
      message: 'Orphaned users analysis completed',
      report
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in cleanup-orphaned-users function:', error);
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

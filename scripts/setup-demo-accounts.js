// This script sets up demo accounts in Supabase
// Run with: node scripts/setup-demo-accounts.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './frontend/.env' });

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase URL or Anon Key in environment variables');
  console.log('Please ensure you have a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Demo accounts configuration
const demoAccounts = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    user_metadata: {
      username: 'admin',
      full_name: 'Admin User',
      role: 'system_admin'
    }
  },
  {
    email: 'teacher@example.com',
    password: 'teacher123',
    user_metadata: {
      username: 'teacher',
      full_name: 'Demo Teacher',
      role: 'academic_staff'
    }
  }
];

async function setupDemoAccounts() {
  console.log('Starting to set up demo accounts...');
  
  for (const account of demoAccounts) {
    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: account.user_metadata,
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          console.log(`User ${account.email} already exists, updating profile...`);
          
          // Sign in the existing user to get the session
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: account.email,
            password: account.password
          });

          if (signInError) {
            console.error(`Error signing in ${account.email}:`, signInError.message);
            continue;
          }

          // Update user metadata
          const { error: updateError } = await supabase.auth.updateUser({
            data: account.user_metadata
          });

          if (updateError) {
            console.error(`Error updating user ${account.email}:`, updateError.message);
          } else {
            console.log(`Updated profile for ${account.email}`);
          }
        } else {
          console.error(`Error creating user ${account.email}:`, signUpError.message);
        }
        continue;
      }

      console.log(`Created user ${account.email}`);
      
      // If you have a profiles table, you can insert additional user data here
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          username: account.user_metadata.username,
          full_name: account.user_metadata.full_name,
          role: account.user_metadata.role,
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error(`Error creating profile for ${account.email}:`, profileError.message);
      } else {
        console.log(`Created profile for ${account.email}`);
      }

    } catch (error) {
      console.error(`Unexpected error with ${account.email}:`, error.message);
    }
  }

  console.log('Demo accounts setup completed!');
}

setupDemoAccounts();

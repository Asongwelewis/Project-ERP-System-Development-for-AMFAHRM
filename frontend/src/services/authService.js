import { supabase } from '../lib/supabaseClient';

// Existing login function (kept for backward compatibility)
export async function loginUser(username, password) {
  const response = await fetch('http://localhost:8000/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Login failed');
  }
  return response.json();
}

// Supabase Authentication Functions
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data.user;
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
export async function signUpWithRole(email, password, role, fullName) {
  // 1. Create the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  });
  
  if (error) throw error;

  const userId = data.user?.id;
  if (!userId) throw new Error('User creation failed');

  // 2. Insert user profile with role into 'profiles' table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ 
      id: userId, 
      role: role, 
      full_name: fullName,
      email: email
    }]);
  
  if (profileError) throw profileError;

  return data.user;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;

  // Fetch user profile to get role
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', data.user.id)
    .single();

  if (profileError) throw profileError;

  return { 
    user: { 
      ...data.user,
      role: profileData.role,
      fullName: profileData.full_name
    }, 
    role: profileData.role 
  };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Get additional user data from profiles table
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return {
    ...user,
    role: profileData.role,
    fullName: profileData.full_name
  };
}

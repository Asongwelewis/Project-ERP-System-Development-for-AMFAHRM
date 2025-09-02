import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function fetchProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  }

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const authed = data.user;
    const profile = await fetchProfile(authed.id);
    setUser({
      id: authed.id,
      email: authed.email,
      username: profile?.username || authed.email,
      role: profile?.role || 'student',
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const profile = await fetchProfile(data.user.id);
        setUser({
          id: data.user.id,
          email: data.user.email,
          username: profile?.username || data.user.email,
          role: profile?.role || 'student',
        });
      }
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser({
          id: session.user.id,
          email: session.user.email,
          username: profile?.username || session.user.email,
          role: profile?.role || 'student',
        });
      } else {
        setUser(null);
      }
    });
    return () => sub.subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

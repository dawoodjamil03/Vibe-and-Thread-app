import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Fallback: use localStorage mock user
      try {
        const storedUser = localStorage.getItem('vt_user');
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    // Supabase: get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Supabase: listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ─── Login ──────────────────────────────────────────────────

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      // Fallback mock login
      const mockUser = { id: 'usr-mock', email, name: email.split('@')[0] };
      setUser(mockUser);
      localStorage.setItem('vt_user', JSON.stringify(mockUser));
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  };

  // ─── Sign up ────────────────────────────────────────────────

  const signup = async (email, password) => {
    if (!isSupabaseConfigured) {
      const mockUser = { id: 'usr-mock', email, name: email.split('@')[0] };
      setUser(mockUser);
      localStorage.setItem('vt_user', JSON.stringify(mockUser));
      return { user: mockUser, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  };

  // ─── Google Sign-In ─────────────────────────────────────────

  const loginWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      const mockUser = { id: 'usr-google', email: 'user@gmail.com', name: 'Google User' };
      setUser(mockUser);
      localStorage.setItem('vt_user', JSON.stringify(mockUser));
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    return { error: error?.message || null };
  };

  // ─── Logout ─────────────────────────────────────────────────

  const logout = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      localStorage.removeItem('vt_user');
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

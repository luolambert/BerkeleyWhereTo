import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return { error: "Supabase not initialized" };
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
    
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return { error: "Supabase not initialized" };
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  return {
    user,
    loading,
    isAdmin,
    signInWithGoogle,
    signOut,
  };
}

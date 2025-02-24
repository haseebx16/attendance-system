import { supabase } from "./supabaseClient";

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user ? { id: user.id, username: user.email } : null;
};

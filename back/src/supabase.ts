import { createClient } from "@supabase/supabase-js";
import { SupabasePlatformRepository } from "./supabase-repository.js";

const isPlaceholder = (value: string) => value.includes("your-project") || value.includes("your-service-role") || value.includes("seu-projeto") || value.includes("cole-sua");

export const hasSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && serviceRoleKey && !isPlaceholder(url) && !isPlaceholder(serviceRoleKey));
};

export const createSupabaseRepository = () => {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) throw new Error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios.");

  const client = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
  return new SupabasePlatformRepository(client);
};
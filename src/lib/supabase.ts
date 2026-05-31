/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Retrieve environment credentials
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://kstpdibudowpxekwkekm.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Verify if valid keys are defined
export const isRealSupabaseConfigured = 
  !!(import.meta as any).env.VITE_SUPABASE_URL && 
  !!(import.meta as any).env.VITE_SUPABASE_ANON_KEY && 
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' &&
  (import.meta as any).env.VITE_SUPABASE_ANON_KEY !== '';

// Lazy initialize or export nullable client to prevent errors
export const supabase = isRealSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Support mock local login for sandbox environments
export async function mockSignIn(email: string, passwordHash: string) {
  // Simple validation to ensure interactive user experience
  if (email.includes('@') && passwordHash.length >= 4) {
    return {
      data: {
        user: {
          id: 'mock-user-123',
          email: email,
          user_metadata: { role: 'student' }
        },
        session: { access_token: 'mock-token' }
      },
      error: null
    };
  }
  return {
    data: { user: null, session: null },
    error: { message: 'Invaid email configuration or password too short' }
  };
}

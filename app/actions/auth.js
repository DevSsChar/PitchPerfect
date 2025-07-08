'use server'

import { upsertUser, updateLastLogin } from '@/lib/supabase-server';

export async function handleUserAuth(userData) {
  if (!userData?.id || !userData?.email) {
    console.error('Invalid user data received:', userData);
    return { 
      success: false, 
      error: 'Invalid user data: ID and email are required' 
    };
  }

  try {
    // First attempt to upsert the user
    const { data, error } = await upsertUser(userData);
    
    if (error) {
      console.error('Failed to upsert user:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to store user data' 
      };
    }

    // Update last login time
    const { error: loginError } = await updateLastLogin(userData.id);
    
    if (loginError) {
      console.warn('Failed to update last login time:', loginError);
      // Don't fail the whole operation if just the login time update fails
    }

    return { 
      success: true, 
      data,
      message: 'User data successfully stored' 
    };
  } catch (error) {
    console.error('Error in handleUserAuth:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
}
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export const upsertUser = async (userData) => {
  if (!userData?.id || !userData?.email) {
    console.error('Invalid user data:', userData);
    return { error: 'Invalid user data: ID and email are required' };
  }

  try {
    // First check if user exists
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('id', userData.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('Error checking existing user:', fetchError);
      return { error: fetchError };
    }

    // If user exists with different email, handle the conflict
    if (existingUser && existingUser.email !== userData.email) {
      console.error('User ID exists with different email:', {
        existing: existingUser.email,
        new: userData.email
      });
      return { error: 'User ID exists with different email' };
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert({
        id: userData.id,
        email: userData.email,
        name: userData.name || '',
        image: userData.image || '',
        provider: userData.provider || '',
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_at: existingUser ? undefined : new Date().toISOString() // Only set for new users
      }, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting user:', error);
      return { error };
    }

    console.log('User upserted successfully:', data);
    return { data };
  } catch (error) {
    console.error('Exception in upsertUser:', error);
    return { error: { message: 'Internal server error during user upsert' } };
  }
};

export const getUserById = async (id) => {
  if (!id) {
    return { error: 'User ID is required' };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting user by id:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Exception in getUserById:', error);
    return { error: { message: 'Internal server error while fetching user' } };
  }
};

export const updateLastLogin = async (id) => {
  if (!id) {
    return { error: 'User ID is required' };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ 
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating last login:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Exception in updateLastLogin:', error);
    return { error: { message: 'Internal server error while updating last login' } };
  }
};
// app/api/auth/config.js
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { upsertUser } from '@/lib/supabase-server';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('SignIn Callback - User:', user);
        console.log('SignIn Callback - Account:', account);
        console.log('SignIn Callback - Profile:', profile);

        // Generate a unique ID if not present
        const userId = user.id || user.sub || profile.sub;

        // Insert or update user in Supabase
        const { error } = await upsertUser({
          id: userId,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account.provider
        });

        if (error) {
          console.error('Error upserting user to Supabase:', error);
          return false;
        }

        // Attach the ID to the user object for later use
        user.id = userId;
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log('JWT Callback - Setting token data:', { user, account });
        token.id = user.id;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log('Session Callback - Setting session data:', token);
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    }
  }
};
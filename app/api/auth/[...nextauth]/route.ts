import NextAuth from 'next-auth/next';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const OPTIONS: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile: (profile) => {
        console.log('🟩', profile, 'is the profile');
        return {
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    // get around github for now since email is not saved in session
    CredentialsProvider({
      name: 'as Guest',
      credentials: {},
      async authorize(credentials) {
        const user = {
          id: Math.random().toString(),
          name: 'Guest',
          email: 'guest@example.com',
        };
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // block signin if necessary
      return true;
    },
  },
  // callbacks: {
  //   session: async ({ session, user }) => {
  //     console.log('😅', user);
  //     console.log('😅👌', session);
  //     let newSession = {
  //       ...session,
  //       email: user.email,
  //     };

  //     session = newSession;
  //     return Promise.resolve(session);
  //   },
  // },
  // callbacks: {
  // async signIn({ profile, account }) {
  //   console.info('we are here to see the callback\nP\nP');
  //   console.log('🟦', profile, 'is the profile');
  //   console.log('🟧', account, 'is the account');

  //   // https://developer.github.com/v3/users/emails/#list-email-addresses-for-the-authenticated-user
  //   const res = await fetch('https://api.github.com/user/emails', {
  //     headers: {
  //       Authorization: `token ${account!.accessToken}`,
  //     },
  //   });

  //   const emails = await res.json();
  //   if (!emails || emails.length === 0) {
  //     console.log('🚨 NO EMAILS FOUND', emails);
  //     return false; // Prevent sign-in
  //   }
  //   // Sort by primary email - the user may have several emails, but only one of them will be primary
  //   const sortedEmails = emails.sort((a, b) => b.primary - a.primary);
  //   profile!.email = sortedEmails[0].email;

  //   return true; // Allow sign-in
  // },
  // },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };

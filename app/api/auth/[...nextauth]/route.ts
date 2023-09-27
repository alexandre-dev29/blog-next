import { users } from '@/db/src';
import { DbConnection } from '@/db/src/DbConnection';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const database = DbConnection.instance();
        const currentUser = await database.query.users.findFirst({
          where: eq(users.email, `${credentials?.email}`),
        });

        if (
          currentUser &&
          (await bcrypt.compare(
            `${credentials?.password}`,
            currentUser.password
          ))
        ) {
          return {
            id: currentUser.id,
            name: currentUser.fullName,
            image: JSON.stringify({ ...currentUser, password: '' }),
          };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import util from "util";
import {checkDbConnection, pool} from '@/config/db'
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs'

const query = util.promisify(pool.query).bind(pool);

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 60 seconds
        updateAge: 60 * 60 * 24 // 24 hours, make it greater than maxAge to avoid refresh
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }

                const isDbConnected = await checkDbConnection();
                if (!isDbConnected) {
                    throw new Error('Error on database access');
                }

                let user;
                try {
                    let users = await query(`SELECT * FROM users WHERE email = '${credentials.email}'`);
                    user = users[0];
                } catch (error) {
                    console.error('Database access error:', error);
                    throw new Error('Database access error');
                }

                if (!user) {
                    throw new Error('No user found with the provided email');
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.fullName = user.fullName; // Add name to the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.fullName = token.fullName; // Add name to the session
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',  // sign-in page
        error: '/auth/error',    // Error code passed in query string as ?error=
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


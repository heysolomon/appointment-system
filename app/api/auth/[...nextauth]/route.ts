import User from "@/models/UserSchema";
import { connectToDB } from "@/utils/db";
import { randomBytes, randomUUID } from "crypto";
import NextAuth, { Account, User as NextAuthUser, Profile, Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"

type TProviders = {
    clientId: string;
    clientSecret: string;
}

type TSession = {
    session: Session;
    token: JWT;
    user: AdapterUser;
};

type TSignIn = {
    user: AdapterUser | NextAuthUser;
    account: Account | null;
    profile?: Profile & { picture: string } | undefined;
    email?: { verificationRequest?: boolean | undefined } | undefined;
    credentials?: {
        username: string;
        password: string;
    } | undefined;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        } as TProviders)
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    cookies: {
        sessionToken: {
            name: `__Secret-next-auth.session-token`,
            options: {
                httpOnly: false,
                secure: true,
                sameSite: 'lax',
                path: '/',
            },
        },
    },
    callbacks: {
        async session({ session, token, user }: TSession) {
            if (session.user && !('id' in session.user)) {
                const sessionUser = await User.findOne({
                    email: session.user.email,
                });

                const userId = sessionUser?._id?.toString() || '';
                session.accessToken = token.accessToken;
                session.user.id = userId;
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async signIn({ account, profile, user, credentials }: TSignIn) {
            try {
                await connectToDB();

                if (profile && profile.email) {
                    // check if a user already exists
                    const userExists = await User.findOne({
                        email: profile.email,
                    });

                    // if not, create a new user
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            name: profile.name,
                            picture: profile.picture,
                        });
                    }
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }

    }

})

export { handler as GET, handler as POST }

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

// Define your custom session type
type TSession = {
    session: Session;
    token: JWT;
    user: AdapterUser;
};

type TSignIn = {
    user: AdapterUser | NextAuthUser;
    account: Account | null;
    profile?: Profile & { picture: string; } | undefined;
    email?: { verificationRequest?: boolean | undefined; } | undefined;
    // credentials?: Record<T> | undefined;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        } as TProviders)
    ],
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    callbacks: {
        async session({ session, token, user }: TSession) {
            if (session.user) {
                if (!('id' in session.user)) {
                    const sessionUser = await User.findOne({
                        email: session.user.email,
                    });

                    const userId = sessionUser?._id?.toString() || '';
                    session.user.id = userId;
                }
            }

            return session;
        },
        async signIn({ profile }: TSignIn) {
            try {
                await connectToDB();

                if (profile) {
                    // check if a user already exists
                    const userExists = await User.findOne({
                        email: profile.email,
                    })

                    // if not, create a new user
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                        })
                    }
                }
                return true;
            } catch (error) {
                console.log(error);

                return false;
            }
        }
    }

})

export { handler as GET, handler as POST }

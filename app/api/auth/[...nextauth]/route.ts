import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

type TProviders = {
    clientId: string;
    clientSecret: string;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        } as TProviders)
    ],
    async session({ session }: AuthOptions) {

    },
    async signIn({ profile }) {

    }
})

export { handler as GET, handler as POST }

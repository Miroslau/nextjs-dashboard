import {NextAuthConfig} from "next-auth";

export const authOptions: NextAuthConfig = {
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                return isLoggedIn;

            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true
        }
    },
    providers: [],
}
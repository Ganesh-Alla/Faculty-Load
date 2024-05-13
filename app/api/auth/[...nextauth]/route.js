import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";


const nextauthoptions = {
    session:{
        strategy:'jwt',
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            type:'credentials',
            credentials:{},
            authorize: async (credentials) => {
                const {email, password} = credentials;
               if (email !== 'admin@gmail.com' && password !== 'admin'){
                throw new Error ('Credentials Invalid');
               }
               console.log("first-auth")
               return {email:email}
            }})
        ],
        pages: {}
};

const handler = NextAuth(nextauthoptions);
export { handler as GET, handler as POST }


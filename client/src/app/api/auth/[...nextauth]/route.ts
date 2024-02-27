import { login } from "@/lib/actions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  session:{
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
    providers: [
        CredentialsProvider({
          credentials: {
            email: {},
            password: {}
          },
          async authorize(credentials, req) {
            if(!credentials){
              return null
            }
            try {
              const user = await login(credentials.email, credentials.password);
              if (user) {
                return {
                  id:user.id,
                  email:user.email
                }
              }
            } catch (error:any) {
              console.log(error.message);
              return null
            }
            return null
          }
        })
      ]
})


export {handler as GET, handler as POST}
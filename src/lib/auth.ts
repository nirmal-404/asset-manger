import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import { admin } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'

const adminRole = 'admin'
const userRole = 'user'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg' // or "pg" or "mysql"
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectUri: 'https://example.com/api/auth/callback/google',
      mapProfileToUser: profile => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
          role: userRole // any user logged in is a normal user by default
        }
      }
    }
  },
  plugins: [
    admin({
      adminRoles: [adminRole],
      defaultRole: userRole
    }),
    nextCookies()
  ]

  //... the rest of your config
})

/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
// import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db";
import * as bcrypt from "bcrypt";

export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        email: { label: "email", type: "text", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user || !user.password) {
            throw new Error("No user found with this email");
          }
          
          // Verify password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return {
            id: user?.id,
            email: user?.email,
            username: user?.username,
            name:user?.fullname
          };

        } catch (error) {
          console.log("auth error" ,error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.fullname = user.fullname;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.fullname = token.fullname as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};


export async function createUser(
  email: string,
  password: string,
  username: string,
  fullname: string
) {
  try {
    // Validate input
    if (!email || !password || !username) {
      throw new Error("Missing required fields");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        username,
        password: hashedPassword,
      },
    });

    return { user };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

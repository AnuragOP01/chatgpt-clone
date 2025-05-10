import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    NEXT_PUBLIC_Gemini_Api_Key : z.string().nonempty(),
    NEXT_PUBLIC_Gemini_URL : z.string(),
    NEXTAUTH_SECRET: z.string().nonempty(),
    OAUTH_CLIENT: z.string().nonempty(),
    OAUTH_SECRET: z.string().nonempty(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.format()
  );
  throw new Error("Environment variables validation failed");
}

// Extend process.env with the validated types
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

export const env = parsedEnv.data;

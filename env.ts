import { z } from "zod";

export const envSchema = z.object({
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_HS256: z.string(),
  APP_PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;

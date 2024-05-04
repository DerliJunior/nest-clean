import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const userResponseBodySchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
});

export type UserResponseDTO = z.infer<typeof userResponseBodySchema>;

export const UserByIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const AutenticationUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AutenticationUserDTO = z.infer<typeof AutenticationUserSchema>;

export type UserByIdDTO = z.infer<typeof UserByIdParamsSchema>;

export const UserByEmailParamsSchema = z.object({
  email: z.string(),
});

export type UserByEmailDTO = z.infer<typeof UserByEmailParamsSchema>;

@Injectable()
export class UserRepository extends PrismaClient {
  constructor() {
    super();
  }

  async findByEmail(email: string): Promise<UserByEmailDTO | null> {
    return await this.user.findUnique({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return await this.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const lista = await this.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return [...lista];
  }

  async findById(id: string): Promise<UserByIdDTO | null> {
    const user = await this.user.findUnique({
      select: {
        id: true,
      },
      where: {
        id: id,
      },
    });

    return user;
  }
}

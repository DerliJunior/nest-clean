import { HttpException, Param, UsePipes } from "@nestjs/common";
import { Post, Body, Controller, HttpCode } from "@nestjs/common";
import { User } from "@prisma/client";
import { env } from "process";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createAccountBodySchema = z.object({
  email: z.string({ message: "Informe o email" }).email("Email inválido"),
  name: z.string().nullable(),
  password: z.string(),
});

type UserDTO = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post("register")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() user: UserDTO): Promise<User | void> {
    createAccountBodySchema.parse(user);

    console.log(env)

    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userExists) throw new HttpException("Usuario já existe", 400);

    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return newUser;
  }
}

import { HttpException, Injectable, Module, Scope } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepository, UserResponseDTO } from "src/core/user/user-repository";
import { z } from "zod";

export const createAccountBodySchema = z.object({
  email: z.string({ message: "Informe o email" }).email("Email inválido"),
  name: z.string().nullable(),
  password: z.string(),
});

export type UserDTO = z.infer<typeof createAccountBodySchema>;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmailAndPassword(
      email,
      password
    );

    if (!user) {
      throw new HttpException("Usuário ou senha inválidos", 400);
    }

    return user;
  }

  async validateUserByEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new HttpException("Email já cadastrado", 409);
    }
  }

  async validateId(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException("Usuário não encontrado", 404);
    }
  }

  async postUser(user: UserDTO): Promise<User> {
    await this.validateUserByEmail(user.email);

    const newUser = await this.userRepository.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return newUser;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}

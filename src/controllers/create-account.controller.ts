import { Get, HttpException, UsePipes } from "@nestjs/common";
import { Post, Body, Controller, HttpCode } from "@nestjs/common";
import { User } from "@prisma/client";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { UserResponseDTO } from "src/core/user/user-repository";
import {
  createAccountBodySchema,
  UserDTO,
  UserService,
} from "src/core/user/user.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async createAccount(@Body() user: UserDTO): Promise<User | void> {
    createAccountBodySchema.parse(user);

    const newUser = await this.userService.postUser(user);

    return newUser;
  }

  @Get()
  @HttpCode(200)
  async listAccounts(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }
}

import {
  Body,
  Controller,
  Headers,
  HttpException,
  Post,
  UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  AutenticationUserDTO,
  AutenticationUserSchema,
} from "src/core/user/user-repository";
import { UserService } from "src/core/user/user.service";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";

type AutenticationResponse = {
  acess_token: string;
};

type TokenBody = {
  token: string;
};

@Controller("autentication")
export class AutenticationController {
  constructor(
    private readonly authService: JwtService,
    private readonly userService: UserService
  ) {}

  @Post("login")
  @UsePipes(new ZodValidationPipe(AutenticationUserSchema))
  async login(
    @Body() loginDTO: AutenticationUserDTO
  ): Promise<AutenticationResponse> {
    const user = await this.userService.validateUser(
      loginDTO.email,
      loginDTO.password
    );

    const token = this.authService.sign({ sub: user?.id });

    return {
      acess_token: token,
    };
  }

  @Post("validate")
  async validate(
    @Headers("authorization") tokenHeader: string
  ): Promise<string | null> {
    try {
      const token = tokenHeader.split(" ")[1];

      const isValid = this.authService.verify(token);

      if (!isValid) {
        throw new HttpException("Usuário ou senha inválidos", 400);
      }

      console.log("User:", isValid);
      const user = isValid.sub;

      return user;
    } catch (error) {
      return null;
    }
  }
}

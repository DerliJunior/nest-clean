import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { CreateAccountController } from "./controllers/create-account.controller";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "env";
import { UserService } from "./core/user/user.service";
import { UserRepository } from "./core/user/user-repository";
import { QuestionService } from "./core/question/question.service";
import { QuestionRepository } from "./core/question/question-repository";
import { QuestionController } from "./controllers/question.controller";
import { AuthModule } from "./auth/auth.module";
import { AutenticationController } from "./controllers/autentication.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    CreateAccountController,
    QuestionController,
    AutenticationController,
  ],
  providers: [
    AppService,
    PrismaService,
    UserService,
    UserRepository,
    QuestionService,
    QuestionRepository,
    JwtStrategy,
  ],
})
export class AppModule {}

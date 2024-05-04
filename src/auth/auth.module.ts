import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Env } from "env";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,

      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true });
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
        const hs256 = config.get("JWT_HS256", { infer: true });

        return {
          signOptions: { algorithm: "RS256", expiresIn: '1d'},
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
        };

        // return {
        //   signOptions: { algorithm: "HS256" },
        //   secret: hs256,
        // };
      },
    }),
  ],
})
export class AuthModule {}

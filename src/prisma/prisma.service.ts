import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleDestroy
{
  constructor() {
    super({
      log: ["query", "warn", "error"],
    });
  }

  onModuleDestroy(): Promise<void> {
    return this.$disconnect();
  }

  onModuleInit(): Promise<void> {
    return this.$connect();
  }

  async findAll(): Promise<User[]> {
    return this.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.user.findUnique({
      where: { id },
    });
  }
}

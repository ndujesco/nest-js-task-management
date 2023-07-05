import { Module } from "@nestjs/common";
import { TaskModule } from "./tasks/tasks.module";

import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TaskModule,
    PrismaModule
  ]
})
export class AppModule {}

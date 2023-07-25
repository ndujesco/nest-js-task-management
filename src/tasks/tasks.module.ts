import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";


@Module({
  imports: [PrismaModule, UserModule, PassportModule,],
  controllers: [TasksController],
  providers: [TasksService]
})

export class TaskModule {}

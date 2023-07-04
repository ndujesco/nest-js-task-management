import { Module } from "@nestjs/common";
import { TaskModule } from "./tasks/tasks.module";

import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TaskModule
  ]
})
export class AppModule {}

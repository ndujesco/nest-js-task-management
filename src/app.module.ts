import { Module } from "@nestjs/common";
import { TaskModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import {  typeOrmConfig } from "./config/typeorm.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TaskModule, 
    TypeOrmModule.forRoot(typeOrmConfig)
  ]
})


export class AppModule {}

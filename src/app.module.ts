import { Module } from "@nestjs/common";
import { TaskModule } from "./tasks/tasks.module";

// import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule
  ]
})
export class AppModule {}


// ConfigModule.forRoot({
//   isGlobal: true
// }),
import { Module } from "@nestjs/common";
import { TaskModule } from "./tasks/tasks.module";

// import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    UserModule
  ]
})
export class AppModule {}


// ConfigModule.forRoot({
//   isGlobal: true
// }),
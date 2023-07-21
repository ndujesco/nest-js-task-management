import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '30d'
    }
  }), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
,
exports: [JwtStrategy, PassportModule]})

export class UserModule {}

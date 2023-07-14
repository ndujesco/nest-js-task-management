import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { hash, compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const userExists = await this.prismaService.user.findUnique({
        where: {
          username
        },
      });
      if (userExists) {
        throw new ConflictException();
      }

    const hashedPassword = await hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword
      }
    });

  }

}

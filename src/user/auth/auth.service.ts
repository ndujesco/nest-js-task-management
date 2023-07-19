import { UnauthorizedException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { hash, compare } from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp({ username, password }: AuthCredentialsDto) {
    let user;
    const hashedPassowrd = await hash(password, 10);
    try {
      user = await this.prismaService.user.create({
        data: { username, password: hashedPassowrd }
      });
    } catch (err) {
      return err.code;
    }
    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const user =  await this.validateUserPassword(authCredentialsDto);
    if (!user) { 
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username }
    });
    if (!user) {
      return null;
    }
    const matches = await compare(password, user.password);
    if (matches) {
      return user;
    }
    return null;
  }
}

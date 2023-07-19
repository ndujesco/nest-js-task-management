import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { hash, compare } from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

    
}

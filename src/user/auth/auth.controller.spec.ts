import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserModule } from '../user.module';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [PrismaService, AuthService],
      controllers: [AuthController, ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

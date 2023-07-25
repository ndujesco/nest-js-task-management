import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockAuthService = () => {
  getTasks: jest.fn();
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [  { provide: AuthService, useFactory: mockAuthService }],
      controllers: [AuthController, ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe("my test", () => {
  it("returns true", () => {
    expect(true).toEqual(true);
  });
});
import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { PrismaService } from "../prisma/prisma.service";

const mockPrismaService = () => {
  getTasks: jest.fn();
};

describe("TaskService", () => {
  let taskService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: PrismaService, useFactory: mockPrismaService }]
    }).compile();
    taskService = await module.get<TasksService>(TasksService);
  });

  describe("getTask", () => {
    it("gets all tasks from the repository", () => {
        
      expect(taskService.getTasks).toBeDefined();
    });
  });
});

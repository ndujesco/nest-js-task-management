import { Test } from "@nestjs/testing";
import { TasksController } from "./tasks.controller"
// import { PrismaService } from "../prisma/prisma.service";
import { TasksService } from "./tasks.service";
import { PrismaService } from "../prisma/prisma.service";

const mockTaskService = () => {
  getTasks: jest.fn();
};

describe("TaskService", () => {
  let taskController: TasksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({

      controllers: [TasksController],
      providers: [{ provide: TasksService, useFactory: mockTaskService }]
    }).compile();
    taskController = await module.get<TasksController>(TasksController);
  });

  describe("getTask", () => {
    it("gets all tasks from the repository", () => {
        // console.log(taskController);
        
      expect(taskController).toBeDefined();
    });
  });
});

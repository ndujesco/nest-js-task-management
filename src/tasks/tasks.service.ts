import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Task, TaskStatus } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks({status, search}: GetTasksFilterDto) {
    let tasks = await this.prismaService.task.findMany();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.description.includes(search) || task.title.includes(search),
      );
      
    }
    return tasks;
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task | NotFoundException> {
    const found = await this.prismaService.task.findUnique({ where: { id } });
    return this.foundOrNot(found, `There is no task with id ${id}`);
  }

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const created = await this.prismaService.task.create({
      data: { title, description, status: TaskStatus.OPEN }
    });
    return created;
  }

  async deleteTaskById(id: number): Promise<Task | NotFoundException> {
    const found = await this.prismaService.task.deleteMany({ where: { id } });

    return this.foundOrNot(found[0], `There is no task with id ${id}`);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus
  ): Promise<Task | NotFoundException> {
    const found = await this.prismaService.task.updateMany({
      where: { id },
      data: { status }
    });
    return this.foundOrNot(
      found[0],
      `There is no task with id ${id} to update`
    );
  }

  foundOrNot(
    task: Task | null | undefined,
    message: string
  ): Task | NotFoundException {
    if (!task) {
      throw new NotFoundException(message);
    }
    return task;
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Task, TaskStatus, User } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks({ status, search }: GetTasksFilterDto, user: User) {
    let tasks = await this.prismaService.task.findMany({ where: {userId: user.id},
      include: { user: true }
    });
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.description.includes(search) || task.title.includes(search)
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

  async getTaskById(id: number, user: User) {
    const found = await this.prismaService.task.findFirst({ where: { id, userId: user.id } });
    
    return this.foundOrNot(found, `There is no task with id ${id}`);
  }

  async createTask(
    { title, description }: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const created = await this.prismaService.task.create({
      data: { title, description, userId: user.id, status: TaskStatus.OPEN }, 
    });
    return created;
  }

  async deleteTaskById(id: number, user: User) {
    const task = await this.getTaskById(id, user);

    const found = (await this.prismaService.task.deleteMany({
      where: { id: ( task as Task).id },
    })) as { count: number };

    return this.foundOrNot(found.count, `There is no task with id ${id}`);
  }


  async updateTaskStatus(id: number, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    
    const found = (await this.prismaService.task.updateMany({
      where: { id: ( task as Task).id },
      data: { status }
    })) as { count: number };

    return this.foundOrNot(
      found.count,
      `There is no task with id ${id} to update`
    );
  }

  foundOrNot(task, message: string) {
    if (!task) {
      throw new NotFoundException(message);
    }
    if (task !== 1) return task; //
    return { task };
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Task, TaskStatus } from "@prisma/client";

@Injectable()
export class TasksService {

  constructor(private readonly prismaService: PrismaService) {}

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


  async getTaskById(id: number): Promise<Task>  {
    const found = await this.prismaService.task.findUnique({where: {id}})
    if (!found) {
      throw new NotFoundException(`There is no task with id ${id}`);
    }
    return found;
  }

  async createTask({ title, description }: CreateTaskDto) {
   await this.prismaService.task.create({data: {title, description, status: TaskStatus.OPEN}})
  }

  // deleteTaskById(id: string): Task {
  //   const found = this.getTaskById(id);
  //   const index = this.tasks.findIndex((task) => task.id === found.id);
  //   return this.tasks.splice(index, 1)[0];
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}

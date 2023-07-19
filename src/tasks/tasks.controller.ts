import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipes";
import { TaskStatus, User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/user/auth/get-user.decorator";
// import { Task, TaskStatus } from "@prisma/client";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ) {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() body: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.createTask(body, user);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number) {
    return this.taskService.deleteTaskById(id);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }
}

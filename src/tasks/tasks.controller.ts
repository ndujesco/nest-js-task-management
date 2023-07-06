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
  ParseIntPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipes";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length)
  //     return this.taskService.getTasksWithFilters(filterDto);
  //   return this.taskService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id', ParseIntPipe)  id: number) {

  // }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Task {
  //   return this.taskService.deleteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.taskService.updateTaskStatus(id, status);
  // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/tasks.dto';
import { Tasks } from './tasks.entity';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  index(): Promise<Tasks[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  show(@Param('id') id: number): Promise<Tasks> {
    return this.taskService.getById(id);
  }

  @Post()
  store(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async update(@Body() data: Tasks, @Param('id') id: number): Promise<Tasks> {
    return await this.taskService.update(id, data);
  }

  @Delete(':id')
  destroy(@Param('id') id: number): Promise<DeleteResult> {
    return this.taskService.deleteTask(id);
  }
}

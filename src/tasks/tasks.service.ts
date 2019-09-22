import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/tasks.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { DeleteResult } from 'typeorm';
import { throws } from 'assert';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly taskRepository: TasksRepository,
  ) {}

  async getAll(): Promise<Tasks[]> {
    return await this.taskRepository.find();
  }

  async getById(id: number): Promise<Tasks> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} was not found! `);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    const deleted = await this.taskRepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with ${id} was not found! `);
    }

    return deleted;
  }

  async update(id: number, data: Tasks): Promise<Tasks> {
    const tasks = await this.getById(id);
    if (!tasks) {
      throw new NotFoundException(`Task with ${id} was not found! `);
    }

    tasks.title = data.title;
    tasks.description = data.description;
    tasks.status = data.status;

    await tasks.save();

    return tasks;
  }
}

import { Repository, EntityRepository } from 'typeorm';
import { Tasks } from './tasks.entity';
import { CreateTaskDto } from './dto/tasks.dto';
import { StatusProgress } from './tasks-status.enum';

@EntityRepository(Tasks)
export class TasksRepository extends Repository<Tasks> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;

    const obj = {
      title,
      description,
      status: StatusProgress.OPEN,
    };

    const created = this.create(obj);

    await created.save();

    return created;
  }
}

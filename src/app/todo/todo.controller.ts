import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MakeSwagger } from 'src/swagger/swagger.config';
import { IndexTodoSwagger } from 'src/swagger/ResponseSwagger/index-todo.swagger';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @MakeSwagger({
    operation: {
      description: 'List all tasks',
      deprecated: false
    }, responses: [
      {
        status: HttpStatus.OK,
        description: 'List of all tasks',
        type: IndexTodoSwagger
      }
    ]
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @MakeSwagger({
    operation: {
      description: 'Create a tasks',
      deprecated: false
    }, responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task created'
      }, 
      {
        status: HttpStatus.BAD_REQUEST,
        description: "Params invalid"
      }
    ]
  })
  async create(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get(':id')
  @MakeSwagger({
    operation: {
      description: 'List task by id',
      deprecated: false
    }, responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task listed sucess'
      }, 
      {
        status: HttpStatus.NOT_FOUND,
        description: "Task not found"
      }
    ]
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id)
  }

  @Put(':id')
  @MakeSwagger({
    operation: {
      description: 'Update a task',
      deprecated: false
    }, responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task update sucess'
      }, 
      {
        status: HttpStatus.BAD_REQUEST,
        description: "Task not found"
      }
    ]
  })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body)
  }

  @Delete(':id')
  @MakeSwagger({
    operation: {
      description: 'Update a task',
      deprecated: false
    }, responses: [
      {
        status: HttpStatus.NO_CONTENT,
        description: 'Task update sucess'
      }, 
      {
        status: HttpStatus.NOT_FOUND,
        description: "Task not found"
      }
    ]
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.deleteById(id)
  }
}

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
import { CreateTodoSwagger } from 'src/swagger/ResponseSwagger/create-todo.swagger';
import { ShowTodoSwagger } from 'src/swagger/ResponseSwagger/show-todo.swagger';
import { UpdateTodoSwagger } from 'src/swagger/ResponseSwagger/update-todo.swagger';
import { BadRequestSwagger } from 'src/swagger/helpers/bad-request.swagger';
import { NotFoundSwagger } from 'src/swagger/helpers/not-found.swagger';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @MakeSwagger({
    operation: {
      description: 'List all tasks',
      deprecated: false,
    },
    responses: [
      {
        status: HttpStatus.OK,
        description: 'List of all tasks',
        type: IndexTodoSwagger,
        isArray: true,
      },
    ],
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @MakeSwagger({
    operation: {
      description: 'Create a tasks',
      deprecated: false,
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task created',
        type: CreateTodoSwagger
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Params invalid',
        type: BadRequestSwagger
      },
    ],
  })
  async create(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get(':id')
  @MakeSwagger({
    operation: {
      description: 'List task by id',
      deprecated: false,
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task listed sucess',
        type: ShowTodoSwagger
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
        type: NotFoundSwagger
      },
    ],
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  @MakeSwagger({
    operation: {
      description: 'Update a task',
      deprecated: false,
    },
    responses: [
      {
        status: HttpStatus.CREATED,
        description: 'Task update sucess',
        type: UpdateTodoSwagger
      },
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Task not found',
        type: NotFoundSwagger
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'invalid data',
        type: BadRequestSwagger
      },
    ],
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @MakeSwagger({
    operation: {
      description: 'Delete a task',
      deprecated: false,
    },
    responses: [
      {
        status: HttpStatus.NO_CONTENT,
        description: 'Task delete sucess',
      },
      {
        status: HttpStatus.NOT_FOUND,
        description: 'Task not found',
        type: NotFoundSwagger
      },
    ],
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.deleteById(id);
  }
}

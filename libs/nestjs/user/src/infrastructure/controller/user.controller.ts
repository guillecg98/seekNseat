import {
  IdAlreadyRegisteredError,
  IdNotFoundError,
} from '@aulasoftwarelibre/nestjs-eventstore';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, EditUserDto, UserDto } from '@seekNseat/contracts/user';
import { catchError, Role, Roles } from '@seekNseat/nestjs/common';
import { Response } from 'express';

import { UserService } from '../services';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() userDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      return this.userService.create(userDto);
    } catch (e) {
      if (e instanceof IdAlreadyRegisteredError) {
        throw new ConflictException(e.message);
      } else {
        throw catchError(e);
      }
    }
  }

  @Get()
  @Roles(Role.Admin)
  async findAll(@Res({ passthrough: true }) res: Response): Promise<UserDto[]> {
    try {
      const users = await this.userService.findAll();
      const length = users.length;

      res.setHeader('X-Total-Count', length);
      //res.setHeader('Content-Range', `users 0-${length}/${length}`);

      return users;
    } catch (e) {
      throw catchError(e);
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string): Promise<UserDto> {
    try {
      return this.userService.findOne(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() userDto: EditUserDto) {
    try {
      return await this.userService.update(id, userDto);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(204)
  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.userService.delete(id);
    } catch (e) {
      if (e instanceof IdNotFoundError) {
        throw new NotFoundException('User not found');
      } else {
        throw catchError(e);
      }
    }
  }
}

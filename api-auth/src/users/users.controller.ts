import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto, UpdateUserInput } from './users.dto';

/**
 * Main controller for users
 */
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    operationId: 'getAllUsers',
    description: 'Find all users',
  })
  @Get('')
  getAllUsers(): Promise<UserDto[]> {
    // Ideally, need to pass filters here, but it's out of the scope of this project
    return this.usersService.getAllUsers({});
  }

  @ApiOperation({
    operationId: 'getUserById',
    description: 'Find a user by id',
  })
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getUser(id);
  }

  @ApiBody({ type: UpdateUserInput })
  @ApiOperation({
    operationId: 'updateUserById',
    description: 'Update a user by id and body',
  })
  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() user: UpdateUserInput,
  ): Promise<UserDto> {
    return this.usersService.updateUser(id, user);
  }

  @ApiOperation({
    operationId: 'deleteUserById',
    description: 'Delete a user by id',
  })
  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}

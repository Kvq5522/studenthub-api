import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth, UUIDParam } from 'src/decorators/http.decorators';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { PaginateUserDto } from 'src/modules/user/dto/paginate-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserRole } from 'src/common/common.enum';
import { UserFindArgs } from 'src/modules/user/dto/user-find-args.dto';
import { UserChangePassDto } from 'src/modules/user/dto/change-pass-user.dto';
import { UpdateProfileDto } from 'src/modules/user/dto/update-profile.dto';
import { ForgotPasswordDto } from 'src/modules/user/dto/forgot-password.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth([UserRole.ADMIN, UserRole.MANAGER])
  @Get()
  getUserList(@Query() args: UserFindArgs): Promise<PaginateUserDto> {
    return this.userService.getAllUser(args);
  }

  @Put('changePassword')
  @Auth() 
  changePassword(@Body() userChangePassDto: UserChangePassDto): Promise<void> {
    return this.userService.changePassword(userChangePassDto);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    await this.userService.forgotPassword(forgotPasswordDto);
    return { message: 'New password sent to your email' };
  }
}

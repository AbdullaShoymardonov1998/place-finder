import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { UsersService } from '@/modules/users/users.service'
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard'
import { IUser } from '@/modules/users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { GetProfileResponseDto } from '@/modules/users/dto/get-profile.dto'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user information' })
  @ApiResponse({ status: HttpStatus.CREATED })
  createProfile(@Body() body: CreateUserDto) {
    return this.userService.createProfile(body)
  }

  @Get('account')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ status: HttpStatus.OK, type: GetProfileResponseDto })
  @UseGuards(JwtAuthGuard)
  getProfile(@User() user: IUser): Promise<GetProfileResponseDto> {
    return this.userService.getProfile(user)
  }
}

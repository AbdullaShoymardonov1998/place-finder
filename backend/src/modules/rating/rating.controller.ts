import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { IUser } from '../users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { CreateRatingDto } from './dto/create-rating.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
@ApiTags('Ratings')
@Controller({ path: 'ratings', version: '1' })
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new rating' })
  createRating(@User() user: IUser, @Body() body: CreateRatingDto) {
    return this.ratingService.createRating(body, user.id)
  }
}

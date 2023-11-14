import { Body, Controller, Post } from '@nestjs/common'
import { RatingService } from './rating.service'
import { IUser } from '../users/dto/user.interface'
import { User } from '@/decorators/user.decorator'
import { CreateRatingDto } from './dto/create-rating.dto'

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  createRating(@User() user: IUser, @Body() body: CreateRatingDto) {
    return this.ratingService.createRating(body, user.id)
  }
}

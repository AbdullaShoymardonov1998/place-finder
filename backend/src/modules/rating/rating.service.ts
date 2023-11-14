import { PrismaService } from '@/core/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateRatingDto } from './dto/create-rating.dto'

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async createRating(body: CreateRatingDto, userId: string) {
    const existingRating = await this.prisma.rating.findMany({
      where: {
        userId,
        placeId: body.placeId,
      },
    })
    if (existingRating) {
      throw new BadRequestException('User already gave a rating')
    } else {
      return this.prisma.rating.create({
        data: {
          place: {
            connect: {
              id: body.placeId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          value: body.value,
        },
      })
    }
  }
}

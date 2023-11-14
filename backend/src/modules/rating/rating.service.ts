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

    for (const rating of existingRating) {
      if (rating.placeId === body.placeId && rating.userId === userId) {
        throw new BadRequestException('User already gave a rating')
      }
    }
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

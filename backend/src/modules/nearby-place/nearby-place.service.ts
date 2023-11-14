import { PrismaService } from '@/core/prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateNearbyPlaceDto } from './dto/create-nearby-place.dto'

@Injectable()
export class NearbyPlaceService {
  constructor(private readonly prisma: PrismaService) {}

  async createNearbyPlace(body: CreateNearbyPlaceDto) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const places = await prisma.place.findMany({
        where: {
          OR: [{ id: body.placeId }, { id: body.nearbyPlaceId }],
        },
        select: {
          id: true,
        },
      })

      if (places.length !== 2) {
        throw new HttpException(
          'One or both places not found',
          HttpStatus.BAD_REQUEST,
        )
      }

      const existingNearbyPlaceConnection =
        await this.prisma.nearbyPlace.findFirst({
          where: {
            AND: [
              {
                placeId: body.placeId,
              },
              {
                nearybyPlaceId: body.nearbyPlaceId,
              },
            ],
          },
        })

      if (!existingNearbyPlaceConnection) {
        return await this.prisma.nearbyPlace.create({
          data: {
            placeId: body.placeId,
            nearybyPlaceId: body.nearbyPlaceId,
          },
        })
      } else {
        throw new HttpException(
          'Nearby place already exists',
          HttpStatus.BAD_REQUEST,
        )
      }
    })
    return result
  }
}

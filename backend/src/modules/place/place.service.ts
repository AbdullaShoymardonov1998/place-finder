import { PrismaService } from '@/core/prisma/prisma.service'
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { Prisma } from '@prisma/client'
import { PAGE_LIMIT } from '@/consts/const'
import { PlaceDto } from './dto/places.dto'
import { PictureService } from '../picture/picture.service'

@Injectable()
export class PlaceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pictureService: PictureService,
  ) {}

  async createPlace(body: CreatePlaceDto) {
    return await this.prisma.place.create({
      data: {
        title: body.title,
        description: body.description,
        address: body.address,
        phone: body.phone,
        email: body.email,
        longitude: body.longitude,
        latitude: body.latitude,
        placeCategoryMap: {
          create: body.categoryIds?.map((id) => {
            return {
              category: {
                connect: {
                  id,
                },
              },
            }
          }),
        },
      },
    })
  }

  async getPlaceById(id: string) {
    const place = await this.prisma.place.findUnique({
      where: { id },
      include: {
        pictures: true,
        ratings: {
          include: {
            user: true,
            place: true,
          },
        },
        placeCategoryMap: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!place) {
      throw new BadRequestException('Place not found')
    }

    if (place.pictures) {
      place.pictures = place.pictures.map((picture) => {
        return {
          ...picture,
          fileUrl: `${process.env.MINIO_URL}/${process.env.MINIO_BUCKET}/${picture.fileName}`,
        }
      })
    }
    const nearByPlaces = await this.prisma.nearbyPlace.findMany({
      where: {
        OR: [
          {
            placeId: id,
          },
          {
            nearybyPlaceId: id,
          },
        ],
      },
      include: {
        place: true,
        nearbyPlace: true,
        ratings: {
          include: {
            user: true,
            place: true,
          },
        },
      },
    })
    const nearbyPlacesInfo = []
    nearByPlaces.forEach((pl) => {
      if (pl.nearybyPlaceId !== id) {
        nearbyPlacesInfo.push({
          id: pl.nearbyPlace.id,
          name: pl.nearbyPlace.title,
        })
      }
      if (pl.placeId !== id) {
        nearbyPlacesInfo.push({
          id: pl.place.id,
          name: pl.place.title,
        })
      }
    })

    return { ...place, nearbyPlacesInfo }
  }

  async getAllPlaces(query: PlaceDto) {
    const skip = (Number(query?.page) - 1) * PAGE_LIMIT
    let where: Prisma.PlaceWhereInput = {}
    if (query?.search) {
      where = {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
          { phone: { contains: query.search, mode: 'insensitive' } },
          { email: { contains: query.search, mode: 'insensitive' } },
          { address: { contains: query.search, mode: 'insensitive' } },
        ],
      }
    }

    const places = await this.prisma.place.findMany({
      where,
      take: PAGE_LIMIT,
      skip,
      include: {
        pictures: true,
        ratings: {
          include: {
            user: true,
            place: true,
          },
        },
      },
    })

    const total = await this.prisma.place.count({
      where,
    })
    const pages = Math.ceil(total / PAGE_LIMIT)

    const mappedPlaces = places.map((place) => ({
      ...place,
      pictures: place.pictures.map((picture) => ({
        ...picture,
        fileUrl: `${process.env.MINIO_URL}/${process.env.MINIO_BUCKET}/${picture.fileName}`,
      })),
    }))

    return { places: mappedPlaces, totalPlaces: total, totalPages: pages }
  }

  async deletePlaceById(id: string) {
    const place = await this.getPlaceById(id)

    if (!place) {
      throw new HttpException(
        `Place with ID ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      )
    }

    for (const picture of place.pictures) {
      await this.pictureService.deletePicturebyId(picture.id)
    }

    const deleteNearbyConnection = this.prisma.nearbyPlace.deleteMany({
      where: {
        OR: [
          {
            placeId: place.id,
          },
          {
            nearybyPlaceId: place.id,
          },
        ],
      },
    })
    const deletePlace = this.prisma.place.delete({
      where: {
        id,
      },
    })

    await this.prisma.$transaction([deleteNearbyConnection, deletePlace])

    return {
      message: 'Deleted successfully',
    }
  }
}

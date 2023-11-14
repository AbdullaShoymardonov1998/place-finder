// src/place-category-map/place-category-map.service.ts

import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CategoryMapCreateDto } from './dto/create-category-map.dto'

@Injectable()
export class CategoryMapService {
  constructor(private prisma: PrismaService) {}

  async createPlaceCategoryMap(data: CategoryMapCreateDto) {
    return this.prisma.placeCategoryMap.create({
      data,
    })
  }
}

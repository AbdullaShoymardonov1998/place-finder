import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CategoryCreateDto } from './dto/create-category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: CategoryCreateDto) {
    return this.prisma.category.create({
      data,
    })
  }
}

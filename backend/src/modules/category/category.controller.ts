// src/category/category.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryCreateDto } from './dto/create-category.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Category')
@Controller({ path: 'categories', version: '1' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create nearby place information' })
  async create(@Body() body: CategoryCreateDto) {
    return this.categoryService.createCategory(body)
  }
}

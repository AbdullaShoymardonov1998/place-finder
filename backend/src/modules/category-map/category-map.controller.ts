// src/place-category-map/place-category-map.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { CategoryMapService } from './category-map.service'
import { CategoryMapCreateDto } from './dto/create-category-map.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Place category map')
@Controller({ path: 'place-category-maps', version: '1' })
export class CategoryMapController {
  constructor(private readonly placeCategoryMapService: CategoryMapService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create nearby place information' })
  async create(@Body() body: CategoryMapCreateDto) {
    return this.placeCategoryMapService.createPlaceCategoryMap(body)
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { PlaceService } from './place.service'
import { GetPlaceResponseDto } from './dto/response-place.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { PlaceDto } from './dto/places.dto'

@ApiTags('Places')
@Controller({ path: 'places', version: '1' })
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create place information' })
  async createPlace(@Body() body: CreatePlaceDto) {
    return this.placeService.createPlace(body)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get place information' })
  async getPlaceById(@Param('id') id: string): Promise<GetPlaceResponseDto> {
    return this.placeService.getPlaceById(id)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all places information' })
  async getAllPlaces(@Query() query: PlaceDto) {
    return this.placeService.getAllPlaces(query)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete place information' })
  async deletePlaceById(@Param('id') id: string) {
    return this.placeService.deletePlaceById(id)
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { NearbyPlaceService } from './nearby-place.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateNearbyPlaceDto } from './dto/create-nearby-place.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Nearby Places')
@UsePipes(new ValidationPipe())
@Controller({ path: 'nearby-place', version: '1' })
export class NearbyPlaceController {
  constructor(private readonly nearbyPlaceService: NearbyPlaceService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create nearby place information' })
  async createPlace(@Body() body: CreateNearbyPlaceDto) {
    return this.nearbyPlaceService.createNearbyPlace(body)
  }
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PlaceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search Place',
    example: 'State Organization',
    required: false,
  })
  search?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Page number for places',
    example: 1,
  })
  page: string
}

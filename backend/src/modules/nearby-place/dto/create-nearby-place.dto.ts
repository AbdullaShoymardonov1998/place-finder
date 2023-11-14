import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator'

export class CreateNearbyPlaceDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place ID',
    example: 'dcfd401c-9ea2-4ceb-bbb9-59cb4b31da0f',
  })
  placeId: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nearby place ID',
    example: 'f6475bee-6720-4df4-a5df-73dfaa567a5c',
  })
  nearbyPlaceId: string
}

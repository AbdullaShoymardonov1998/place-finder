import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place ID',
    example: 'df958e57-40f6-4f08-9f24-5bc96c7819af',
  })
  placeId: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User rating',
    example: 5,
  })
  value: number
}

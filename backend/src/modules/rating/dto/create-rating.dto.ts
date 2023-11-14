import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateRatingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place ID',
    example: 'df958e57-40f6-4f08-9f24-5bc96c7819af',
  })
  placeId: string

  @IsNumber()
  @Max(5)
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User rating',
    example: 5,
    maximum: 5,
    minimum: 1,
  })
  value: number
}

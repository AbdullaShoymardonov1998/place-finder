import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CategoryMapCreateDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place ID',
    example: 'f6475bee-6720-4df4-a5df-73dfaa567a5c',
  })
  placeId: string

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category ID',
    example: 'f6475bee-6720-4df4-a5df-73dfaa567a5c',
  })
  categoryId: string
}

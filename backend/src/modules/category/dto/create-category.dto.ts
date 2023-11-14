import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Category title', example: 'Category 1' })
  title: string
}

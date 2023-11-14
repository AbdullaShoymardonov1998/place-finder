import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place title',
    example: 'State Organization',
  })
  title: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place description',
    example: 'State Organization belongs to the authority of the law service',
  })
  description: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place address',
    example: 'Jizzakh city, Yoshlik st, 21',
  })
  address: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place contact information',
    example: '+1234567890',
  })
  phone: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Place contact's email address",
    example: 'user@gmail.com',
  })
  email: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place latitude',
    example: 40.1331551,
  })
  latitude: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Place latitude',
    example: 67.8217168,
  })
  longitude: number

  categoryIds?: string[]
}

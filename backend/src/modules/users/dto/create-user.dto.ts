import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User firstname',
    example: 'John',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User lastname',
    example: 'Doe',
  })
  lastName: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  password: string
}

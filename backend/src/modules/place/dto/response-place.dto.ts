import { ApiProperty } from '@nestjs/swagger'

export class GetPlaceResponseDto {
  @ApiProperty({ description: 'User Id' })
  id: string

  @ApiProperty({ description: 'User firstname', example: 'John' })
  title: string

  @ApiProperty({ description: 'User lastName', example: 'Doe' })
  description: string

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  address: string

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  phone: string

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  email: string

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  longitude: number

  @ApiProperty({ description: 'User email', example: 'user@mail.com' })
  latitude: number

  @ApiProperty({ description: 'User created time', example: new Date() })
  createdAt: Date

  @ApiProperty({ description: 'User latest updated time', example: new Date() })
  updatedAt: Date
}

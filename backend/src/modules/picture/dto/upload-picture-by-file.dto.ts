import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class UploadFileDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Place ID',
    example: 'wqe1-21d11-21d21-2121d1-21d21',
  })
  placeId: string

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}

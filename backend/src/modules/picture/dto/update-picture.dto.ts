import { ApiProperty } from '@nestjs/swagger'

export class UpdatePictureDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}

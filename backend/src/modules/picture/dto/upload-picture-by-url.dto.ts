import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class UploadPictureByUrl {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  placeId: string

  @IsString()
  @IsNotEmpty()
  sourceURL: string
}

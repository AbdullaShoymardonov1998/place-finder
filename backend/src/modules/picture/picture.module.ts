import { CoreModule } from '@/core/core.module'
import { Module } from '@nestjs/common'
import { PictureController } from './picture.controller'
import { PictureService } from './picture.service'

@Module({
  imports: [CoreModule],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}

import { Module } from '@nestjs/common'
import { PlaceService } from './place.service'
import { PlaceController } from './place.controller'
import { CoreModule } from '@/core/core.module'
import { PictureService } from '../picture/picture.service'

@Module({
  imports: [CoreModule],
  providers: [PlaceService, PictureService],
  controllers: [PlaceController],
})
export class PlaceModule {}

import { Module } from '@nestjs/common'
import { NearbyPlaceService } from './nearby-place.service'
import { NearbyPlaceController } from './nearby-place.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [NearbyPlaceService],
  controllers: [NearbyPlaceController],
})
export class NearbyPlaceModule {}

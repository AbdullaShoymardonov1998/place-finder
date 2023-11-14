import { Module } from '@nestjs/common'
import { RatingService } from './rating.service'
import { RatingController } from './rating.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}

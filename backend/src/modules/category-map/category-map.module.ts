import { Module } from '@nestjs/common'
import { CategoryMapService } from './category-map.service'
import { CategoryMapController } from './category-map.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [CategoryMapService],
  controllers: [CategoryMapController],
})
export class CategoryMapModule {}

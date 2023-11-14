import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [CoreModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}

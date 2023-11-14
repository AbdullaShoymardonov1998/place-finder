import { Module } from '@nestjs/common'
import { UsersModule } from '@/modules/users/users.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { CoreModule } from '@/core/core.module'
import { PlaceModule } from './modules/place/place.module';
import { PictureController } from './modules/picture/picture.controller';
import { PictureService } from './modules/picture/picture.service';
import { PictureModule } from './modules/picture/picture.module';
import { NearbyPlaceModule } from './modules/nearby-place/nearby-place.module';
import { CategoryModule } from './modules/category/category.module';
import { CategoryMapModule } from './modules/category-map/category-map.module';
import { RatingModule } from './modules/rating/rating.module';
@Module({
  imports: [UsersModule, AuthModule, CoreModule, PlaceModule, PictureModule, NearbyPlaceModule, CategoryModule, CategoryMapModule, RatingModule],
  controllers: [PictureController],
  providers: [PictureService],
})
export class AppModule {}

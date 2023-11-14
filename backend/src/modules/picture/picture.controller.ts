import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PictureService } from './picture.service'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UploadFileDto } from './dto/upload-picture-by-file.dto'
import { UploadPictureByUrl } from './dto/upload-picture-by-url.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@UsePipes(new ValidationPipe())
@ApiTags('Pictures')
@Controller({ path: 'pictures', version: '1' })
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('upload-by-file')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file for Places' })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Body() pictureDetails: UploadFileDto,
  ) {
    return this.pictureService.uploadFile(file, pictureDetails)
  }

  @Post('upload-by-url')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload file by URL' })
  @HttpCode(HttpStatus.CREATED)
  async uploadImageByUrl(@Body() pictureDetails: UploadPictureByUrl) {
    return this.pictureService.uploadImageByUrl(pictureDetails)
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all pictures' })
  @HttpCode(HttpStatus.OK)
  async getAllPictures() {
    return this.pictureService.getAllPictures()
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update picture' })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file,
    @Body() pictureDetails: UpdatePictureDto,
    @Param('id') id: number,
  ) {
    return this.pictureService.updatePicture(file, pictureDetails, id)
  }
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete picture by ID' })
  @HttpCode(HttpStatus.OK)
  async deletePictureById(@Param('id') id: number) {
    return this.pictureService.deletePicturebyId(id)
  }
}

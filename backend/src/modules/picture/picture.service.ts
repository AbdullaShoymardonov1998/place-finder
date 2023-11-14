import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import * as Minio from 'minio'
import axios from 'axios'
import { PrismaService } from '@/core/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-picture-by-file.dto'
import { UploadPictureByUrl } from './dto/upload-picture-by-url.dto'
import { UpdatePictureDto } from './dto/update-picture.dto'
import { Multer } from 'multer'

@Injectable()
export class PictureService {
  constructor(private readonly prisma: PrismaService) {}
  minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  })

  async uploadFile(file: Express.Multer.File, pictureDetails: UploadFileDto) {
    const fileName = await this.uploadFileToMinio(file)

    const picture = await this.prisma.picture.create({
      data: {
        fileName: fileName,
        place: {
          connect: {
            id: pictureDetails.placeId,
          },
        },
      },
    })

    return {
      message: 'File uploaded successfully',
      fileName,
      picture,
    }
  }

  async uploadImageByUrl(pictureDetails: UploadPictureByUrl) {
    const bucketName = process.env.MINIO_BUCKET

    const filenameParts = pictureDetails.sourceURL.split('.')
    const fileExtension = filenameParts[filenameParts.length - 1]
    const fileName = `images/${Date.now()}.${fileExtension}`
    const response = await axios({
      method: 'get',
      url: pictureDetails.sourceURL,
      responseType: 'stream',
    })
    if (response.status !== HttpStatus.OK) {
      throw new BadRequestException('File not found')
    }
    const metaData = {
      'Content-Type': 'image/jpeg',
    }

    await this.minioClient.putObject(
      bucketName,
      fileName,
      response.data,
      metaData,
    )

    const picture = await this.prisma.picture.create({
      data: {
        fileName: fileName,
        place: {
          connect: {
            id: pictureDetails.placeId,
          },
        },
      },
    })

    return {
      message: 'File uploaded successfully',
      data: fileName,
      house: picture,
    }
  }

  async deletePicturebyId(pictureId: number) {
    const id = Number(pictureId)
    const existingPicture = await this.prisma.picture.findUnique({
      where: { id },
    })
    if (!existingPicture) {
      throw new BadRequestException(`Picture with id=${id} not found`)
    }
    await this.deleteFileFromMinio(existingPicture.fileName)
    await this.prisma.picture.delete({
      where: { id },
    })
    return {
      message: `Picture with id=${pictureId} is deleted successfully`,
      placeId: existingPicture.placeId,
    }
  }

  async uploadFileToMinio(file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.MINIO_BUCKET
    const fileExtention = file.originalname.split('.')
    const extention = fileExtention[fileExtention.length - 1]
    const fileName = `places/${Date.now()}.${extention}`

    const metaData = {
      'Content-Type': file.mimetype,
    }
    await this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      metaData,
    )

    return fileName
  }

  async uploadFileToMinioByUrl(fileUrl: string) {
    const bucketName = process.env.MINIO_BUCKET

    const filenameParts = fileUrl.split('.')
    const fileExtension = filenameParts[filenameParts.length - 1]
    const fileName = `images/${Date.now()}.${fileExtension}`
    const response = await axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    })
    if (response.status !== HttpStatus.OK) {
      throw new BadRequestException('File not found')
    }
    const metaData = {
      'Content-Type': 'image/jpeg',
    }

    await this.minioClient.putObject(
      bucketName,
      fileName,
      response.data,
      metaData,
    )

    return fileName
  }

  async deleteFileFromMinio(fileName: string): Promise<void> {
    const bucketName = process.env.MINIO_BUCKET
    await this.minioClient.removeObject(bucketName, fileName)
  }

  async getImageById(id: number) {
    const image = await this.prisma.picture.findUnique({
      where: {
        id,
      },
    })

    if (!image) {
      throw new BadRequestException('Image not found')
    }

    return image
  }

  async getAllPictures() {
    return await this.prisma.picture.findMany({
      include: {
        place: true,
      },
    })
  }

  async updatePicture(
    file: Express.Multer.File,
    pictureDetails: UpdatePictureDto,
    pictureId: number,
  ) {
    const newFilename = await this.uploadFileToMinio(file)
    const existingPicture = await this.getImageById(pictureId)

    if (existingPicture.fileName !== newFilename) {
      await this.deleteFileFromMinio(existingPicture.fileName)
    }

    const updatedFile = await this.prisma.picture.update({
      where: {
        id: pictureId,
      },
      data: {
        fileName: newFilename,
      },
    })

    return {
      message: `File with and id ${pictureId} updated successfully`,
      updatedFile,
    }
  }
}

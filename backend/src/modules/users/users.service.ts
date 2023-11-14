import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { IUser } from '@/modules/users/dto/user.interface'
import { GetProfileResponseDto } from './dto/get-profile.dto'
import { Prisma, UserRoles } from '@prisma/client'
import { PASSWORD_SALT } from '@/consts/password-salt'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(user: IUser): Promise<GetProfileResponseDto> {
    const where: Prisma.UserWhereUniqueInput = {
      id: user.id,
    }
    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async createProfile(body: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcrypt.hash(body.password, PASSWORD_SALT),
        role: UserRoles.USER,
      },
    })
  }
}

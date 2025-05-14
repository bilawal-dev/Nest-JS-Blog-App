import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getProfile(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                posts: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        return user;
    }

    async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
        return this.prisma.user.update({
            where: { id },
            data: {
                ...updateProfileDto,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    }
}

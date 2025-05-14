import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCategoryDto: CreateCategoryDto) {
        return this.prisma.category.create({
            data: { name: createCategoryDto.name },
        });
    }

    async findAll() {
        return this.prisma.category.findMany({
            include: {
                posts: true
            }
        });
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Category Not Found');
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Category Not Found');
        }
        return this.prisma.category.update({
            where: { id },
            data: { ...updateCategoryDto },
        });
    }

    async remove(id: number) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category) {
            throw new NotFoundException('Category Not Found');
        }
        return this.prisma.category.delete({ where: { id } });
    }
}

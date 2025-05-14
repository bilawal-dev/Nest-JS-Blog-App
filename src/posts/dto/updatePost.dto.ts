import { IsString, IsInt, MinLength, Min, IsOptional } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    @MinLength(10)
    title: string;

    @IsOptional()
    @IsString()
    @MinLength(100)
    content: string;

    @IsOptional()
    @IsInt()
    categoryId: number;
}

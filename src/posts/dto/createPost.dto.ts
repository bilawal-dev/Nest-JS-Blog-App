import { IsNotEmpty, IsString, IsInt, MinLength, Min } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    content: string;

    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}

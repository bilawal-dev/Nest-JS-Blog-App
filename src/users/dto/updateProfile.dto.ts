import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @MinLength(3)
    @IsString()
    name: string;

    @IsOptional()
    @MinLength(6)
    @IsString()
    password: string;

}
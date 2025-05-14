import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;
}

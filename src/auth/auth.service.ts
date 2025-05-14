import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }


    async signup(signupDto: SignupDto) {
        const { email, password, name } = signupDto;

        const existingUser = await this.prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return { message: 'User created successfully' };
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        const passwordMatches = await bcrypt.compare(loginDto.password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }
}

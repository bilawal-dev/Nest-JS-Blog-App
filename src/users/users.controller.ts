import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getProfile(@Req() req: any) {
        return this.usersService.getProfile(req.user.id)
    }

    @Patch()
    updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
        return this.usersService.updateProfile(req.user.id, updateProfileDto)
    }

}

import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from 'src/common/base-response.dto';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/registration")
    async registrationUser(@Body() userDto: CreateUserDto) {
        return new BaseResponse(await this.authService.registrationUser(userDto))
    }

    @Post("/login")
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        return new BaseResponse(await this.authService.login(loginUserDto))
    }
}

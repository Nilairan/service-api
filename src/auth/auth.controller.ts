import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/registration")
    registrationUser(@Body() userDto: CreateUserDto) {
        return this.authService.registrationUser(userDto)
    }

    @Post("/login")
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from 'src/common/base-response.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login_user.dto';
import * as baseConfig from './../common/base-config'

@Controller(`${baseConfig.baseApi}/auth`)
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

    @Post('client/registration')
    async clientRegistration(@Body() userDto: CreateUserDto) {
        return new BaseResponse(await this.authService.clientRegistration(userDto))
    }

    @Post('client/login') 
    async clientLogin(@Body() loginUserDto: LoginUserDto) {
        return new BaseResponse(await this.authService.clientLogin(loginUserDto))
    }
}

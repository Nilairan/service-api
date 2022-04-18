import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    findAll() {
        return this.userService.getAllUser();
    }

    @Get('/:id')
    findUserById(@Param ('id') id: number) {
        return this.userService.getUserById(id)
    }
}

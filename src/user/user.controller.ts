import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { BaseResponse } from 'src/common/base-response.dto';
import { Roles } from 'src/role/role-auth.decorator';
import { AddRoleToUserDto } from './dto/add-user-role.dto';
import { AddUsetStationDto } from './dto/add-user-station.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async findAll() {
        return new BaseResponse(await this.userService.getAllUser())
    }

    @Get('/:id')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async findUserById(@Param ('id') id: number) {
        return new BaseResponse(await this.userService.getUserById(id))
    }

    @Post('/:id/role')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async addRoleByUserId(@Param('id') userId: number, @Body() addRoleToUserDto: AddRoleToUserDto) {
        return new BaseResponse(await this.userService.addRoleByUserId(userId, addRoleToUserDto.roleId))
    }

    @Delete('/:id/role')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async deleteRoleByUserId(@Param('id') userId: number, @Body() addRoleToUserDto: AddRoleToUserDto) {
        return new BaseResponse(await this.userService.deleteRoleByUserId(userId, addRoleToUserDto.roleId))
    }

    @Post('/:id/station/')
    @Roles('ADMIN', 'MANAGER')
    @UseGuards(RolesGuard)
    async addStationForUser(@Param('id') userId: number, @Body() dto: AddUsetStationDto) {
        return new BaseResponse(await this.userService.addStationForUser(userId, dto.stationId)) 
    }

}

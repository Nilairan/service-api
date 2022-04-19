import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { BaseResponse } from 'src/common/base-response.dto';
import { CreateRoleDto } from './dto/create_role.dto';
import { Roles } from './role-auth.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor (private roleService: RoleService) { }

    @Post()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async create(@Body() dto: CreateRoleDto) {
        return new BaseResponse(await this.roleService.createRole(dto))
    }

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async getAllRoles() {
        return new BaseResponse(await this.roleService.getAllRoles())
    }
}

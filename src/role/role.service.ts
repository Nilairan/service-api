import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(roleDto: CreateRoleDto) {
        return this.roleRepository.create(roleDto)
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        if (role) {
            return role
        }
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    async getDefaultRole() {
        const role = await this.getRoleByValue('CLIENT')
        if (!role) {
            throw new HttpException('Role not found', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return role
    }
}

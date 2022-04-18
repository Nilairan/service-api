import { Injectable } from '@nestjs/common';
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
        return this.roleRepository.findOne({where: {value}})
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create_role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(roleDto: CreateRoleDto): Promise<Role> {
        return this.roleRepository.create(roleDto)
    }

    async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.findAll()
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {value}})
        if (role) {
            return role
        }
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    async getRoleById(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id}})
        if (role) {
            return role
        }
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }

    async getDefaultRole(): Promise<Role> {
        const role = await this.getRoleByValue('STAFF')
        if (role) {
            return role
        }
        throw new HttpException('Role not found', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async getClientRole() {
        const role = await this.getRoleByValue('CLIENT')
        if (!role) new HttpException('Role not found', HttpStatus.INTERNAL_SERVER_ERROR)
        return role
    }
}

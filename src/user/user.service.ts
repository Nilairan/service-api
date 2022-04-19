import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Role } from 'src/role/role.model';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor (
        @InjectModel (User) private userRepository: typeof User,
        private roleService: RoleService
    ) {}

    async createUser(userDto: CreateUserDto, role: Role): Promise<User> {
        const user = await this.userRepository.create(userDto)
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUser(): Promise<Array<User>> {
        return await this.userRepository.findAll({include: {all: true}})
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        console.log(user)
        if (!user) {
            console.log(user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return user
    }

    async addRoleByUserId(userId: number, roleId: number): Promise<boolean> {
        const role = await this.roleService.getRoleById(roleId)
        const user = await this.getUserById(userId)
        user.$add ('role', role.id)
        return true
    }

    async deleteRoleByUserId(userId: number, roleId: number): Promise<boolean> {
        const role = await this.roleService.getRoleById(roleId)
        const user = await this.getUserById(userId)
        user.$remove ('role', role.id)
        return true
    }

    async getUserByEmailOrPhone(email: string, phone: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {
            [Op.or]: {
                email: email,
                phone: phone
            }
        }, include: {all: true}})
        return user
    }
}

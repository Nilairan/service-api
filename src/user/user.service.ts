import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { or } from 'sequelize/types';
import { Role } from 'src/role/role.model';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor (@InjectModel (User) private userRepository: typeof User) {}

    async createUser(userDto: CreateUserDto, role: Role) {
        const user = await this.userRepository.create(userDto)
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUser() {
        return await this.userRepository.findAll()
    }

    async getUserById(id: number) {
        return await this.userRepository.findOne({where: {id}})
    }

    async getUserByEmailOrPhone(email: string, phone: string) {
        const user = await this.userRepository.findOne({where: {
            [Op.or]: {
                email: email,
                phone: phone
            }
        }})
        return user
    }
}

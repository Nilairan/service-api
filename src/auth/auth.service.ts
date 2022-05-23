import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/user.model';
import { Token } from './model/token.model';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login_user.dto';
import { Role } from 'src/role/role.model';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private jwtService: JwtService,
        private clientService: ClientService
    ) {}

    async registrationUser(userDto: CreateUserDto): Promise<Token> {
        const candidate = await this.userService.getUserByEmailOrPhone(userDto.email, userDto.phone)
        if (candidate) {
            throw new HttpException('User is already existing', HttpStatus.BAD_REQUEST)
        }
        
        const password = await this.generatePassword(userDto.password)
        const defaultRole = await this.roleService.getDefaultRole()
        const user = await this.userService.createUser({...userDto, password: password }, defaultRole)
        return this.generateToken(user.id, user.roles.map(i => i.value))
    }

    async login(loginDto: LoginUserDto): Promise<Token> {
        const user = await this.userService.getUserByEmailOrPhone(loginDto.login, loginDto.login)
        if (!user) {
            throw new HttpException('User not not found', HttpStatus.BAD_REQUEST)
        }
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordEquals) {
            throw new HttpException('Invalid login or password', HttpStatus.BAD_REQUEST)
        }
        return this.generateToken(user.id, user.roles.map(i => i.value))
    }

    async clientRegistration(userDto: CreateUserDto) {
        const candidate = await this.clientService.getClientByEmailOrPhone(userDto.email, userDto.phone)
        if (candidate) throw new HttpException('User is already existing', HttpStatus.BAD_REQUEST)
        const password = await this.generatePassword(userDto.password)
        const clientRole = await this.roleService.getClientRole()
        const client = await this.clientService.createClient({ ...userDto, password: password })
        return this.generateToken(client.id, [clientRole.value])
    }

    async clientLogin(loginDto: LoginUserDto) {
        const client = await this.clientService.getClientByEmailOrPhone(loginDto.login, loginDto.login)
        if (!client) throw new HttpException('User not not found', HttpStatus.BAD_REQUEST)
        const passwordEquals = await bcrypt.compare(loginDto.password, client.password);
        if (!passwordEquals) throw new HttpException('Invalid login or password', HttpStatus.BAD_REQUEST)
        const clientRole = await this.roleService.getClientRole()
        return this.generateToken(client.id, [clientRole.value])
    }

    private async generatePassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(2)
        return  bcrypt.hash(password, salt)
    }

    private async generateToken(userId: number, rolesValue: string[]): Promise<Token> {
        const payload = {userId: userId, rolesValue: rolesValue}
        return new Token(
            this.jwtService.sign(payload)
        )
    }
}

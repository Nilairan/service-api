import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Client } from './client.model';

@Injectable()
export class ClientService {

	constructor(@InjectModel (Client) private clientRepository: typeof Client) {}

    async getClientByEmailOrPhone(email: string, phone: string) {
        const client = await this.clientRepository.findOne({where: {
            [Op.or]: {
                email: email,
                phone: phone
            }
        }})
        return client
    }

	async createClient(userDto: CreateUserDto) {
        return await this.clientRepository.create(userDto)
    }

	async getClientById(clientId: number) {
		const client = await this.clientRepository.findOne({ where: { id: clientId }, include: {all: true} })
		if (!client) throw new HttpException('client not found', HttpStatus.NOT_FOUND)
		return client
	}
}

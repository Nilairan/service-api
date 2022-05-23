import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './car.model';
import { CreateCarRequestDto } from './dto/create-car.dto';

@Injectable()
export class CarService {

	constructor(@InjectModel (Car) private carRepository: typeof Car) {}

	async getCarById(id: number) {
		const car = await this.carRepository.findOne( { where: { id: id } } )
		if (!car) throw new HttpException('car not found', HttpStatus.NOT_FOUND)
		return car
	}

	async getCarsByClientId(clientId: number) {
		const car = await this.carRepository.findOne( { where: { clientId: clientId } } )
		if (!car) throw new HttpException('car not found', HttpStatus.NOT_FOUND)
		return car
	}
	
	async createCar(createCarRequestDto: CreateCarRequestDto) {
		return await this.carRepository.create(createCarRequestDto)
	}
}

import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { BaseResponse } from 'src/common/base-response.dto';
import { CarService } from './car.service';
import { CreateCarRequestDto } from './dto/create-car.dto';
import * as baseConfig from './../common/base-config'
import { Role, Roles } from 'src/role/role-auth.decorator';
import { RolesGuard } from 'src/auth/role-auth.guard';

let role = ['ADMIN', 'MANAGER', 'STAFF'];

@Controller(`${baseConfig.baseApi}/car`)
export class CarController {

	constructor(private carService: CarService) {}

	@Get('/:id')
	@Roles(['MANAGER', 'STAFF', 'ADMIN'])
    @UseGuards(RolesGuard)
	async getCarById(@Param('id') id: number) {
		return new BaseResponse(await this.carService.getCarById(id)) 
	}

	@Get('client/:id')
	@Roles(['MANAGER', 'STAFF', 'ADMIN'])
    @UseGuards(RolesGuard)
	async getCarsByClientId(@Param('id') clientId: number) {
		return new BaseResponse(await this.carService.getCarsByClientId(clientId))
	}

	
	@Post()
	@Roles(['MANAGER', 'ADMIN'])
    @UseGuards(RolesGuard)
	async createCar(@Body() createCarRequestDto: CreateCarRequestDto) {
		return new BaseResponse(await this.carService.createCar(createCarRequestDto))
	}
}

import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/role-auth.guard';
import { BaseResponse } from 'src/common/base-response.dto'; 
import { Role } from 'src/role/role-auth.decorator';
import { ChangeStationDataDto } from './dto/change-station-data.dto';
import { CreateAutoStationDto } from './dto/create-auto-station.dto';
import { DeleteStationDto } from './dto/delete-station.dto';
import { StationService } from './station.service';
import * as baseConfig from './../common/base-config'

@Controller(`${baseConfig.baseApi}/station`)
export class StationController {

	constructor(private service: StationService) {}

	@Post()
    @Role('ADMIN')
    @UseGuards(RolesGuard)
	async createAutoStation(@Body() dto: CreateAutoStationDto) {
		return new BaseResponse(await this.service.createStation(dto))
	}

	@Get()
	async getAllAutoStation() {
		return new BaseResponse(await this.service.getAllStation())
	}

	@Put()
    @Role('ADMIN')
    @UseGuards(RolesGuard)
	async changeStationData(@Body() dto: ChangeStationDataDto) {
		return new BaseResponse(await this.service.changeStationData(dto))
	}

	@Delete()
    @Role('ADMIN')
    @UseGuards(RolesGuard)
	async deleteStation(@Body() dto: DeleteStationDto) {
		return new BaseResponse(await this.service.deleteStationById(dto))
	}
}

import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stat } from 'fs';
import { Op } from 'sequelize';
import { ChangeStationDataDto } from './dto/change-station-data.dto';
import { CreateAutoStationDto } from './dto/create-auto-station.dto';
import { DeleteStationDto } from './dto/delete-station.dto';
import { Station } from './station.model';

@Injectable()
export class StationService {

	constructor(@InjectModel (Station) private stationRepository: typeof Station) {}

	async createStation(dto: CreateAutoStationDto): Promise<Station> {
		const candidate = await this.stationRepository.findOne({ where: {
			[Op.or]: {
				name: dto.name,
				address: dto.address
			}
		}})
		if (candidate) throw new HttpException('station already exist', HttpStatus.BAD_REQUEST)
		const station = await this.stationRepository.create(dto)
		return station
	}

	async getAllStation(): Promise<Array<Station>> {
		return await this.stationRepository.findAll({ include: { all: true } })
	}

	async getStationById(stationId: number): Promise<Station> {
		const station = await this.stationRepository.findOne({ where: { id: stationId } })
		if (!station) throw new HttpException('station not found', HttpStatus.NOT_FOUND)
		return station
	}

	async changeStationData(dto: ChangeStationDataDto): Promise<Station> {
		const candidate = await this.stationRepository.findOne({ where: { id: dto.id } })
		if (!candidate) throw new HttpException('station not found', HttpStatus.NOT_FOUND)
		return candidate.update({
			name: dto.name,
			address: dto.address,
			startWorkTime: dto.startWorkTime,
			endWorkTime: dto.endWorkTime
		})
	}

	async deleteStationById(dto: DeleteStationDto): Promise<Array<Station>> {
		try {
			await this.stationRepository.destroy({ where: { id: dto.stationId } })
			return this.getAllStation()
		} catch(e) {
			console.log(e)
			throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}

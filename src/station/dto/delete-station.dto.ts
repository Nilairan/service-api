import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteStationDto {
	@IsNotEmpty()
	@IsNumber()
	readonly stationId: number
}
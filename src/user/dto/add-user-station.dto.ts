import { IsNotEmpty, IsNumber } from "class-validator";

export class AddUsetStationDto {
	@IsNotEmpty()
	@IsNumber()
	readonly stationId: number
}
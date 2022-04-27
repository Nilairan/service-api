import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { LocalDateTime } from "js-joda";

export class ChangeStationDataDto {
	@IsNotEmpty()
	@IsNumber()
	readonly id: number
	@IsNotEmpty()
	@IsString()
	readonly name: string
	@IsNotEmpty()
	@IsString()
	readonly address: string
	@IsNotEmpty()
	readonly startWorkTime: LocalDateTime
	@IsNotEmpty()
	readonly endWorkTime: LocalDateTime
}
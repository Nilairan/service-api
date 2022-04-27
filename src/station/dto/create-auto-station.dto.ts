import { IsNotEmpty } from "class-validator"
import { LocalDateTime } from "js-joda"

export class CreateAutoStationDto {
	@IsNotEmpty()
	readonly name: string
	@IsNotEmpty()
	readonly address: string
	@IsNotEmpty()
	readonly startWorkTime: LocalDateTime
	@IsNotEmpty()
	readonly endWorkTime: LocalDateTime
}
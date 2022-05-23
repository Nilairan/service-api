import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateCarRequestDto {
	@IsNotEmpty()
	readonly mark: string
	@IsNotEmpty()
	readonly model: string
	@IsNotEmpty()
	readonly licensePlat: string
	@IsNotEmpty()
	@IsNumber()
	readonly clientId: number
}
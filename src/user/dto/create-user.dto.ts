import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    readonly email: string
    @IsPhoneNumber()
    readonly phone: string
    @IsNotEmpty()
    readonly password: string
    @IsNotEmpty()
    readonly firstName: string
    @IsNotEmpty()
    readonly lastName: string
}
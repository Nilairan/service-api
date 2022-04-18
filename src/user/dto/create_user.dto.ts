import { Role } from "src/role/role.model"

export class CreateUserDto {
    readonly email: string
    readonly phone: string
    readonly password: string
}
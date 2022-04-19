import { IsNumber, IsString } from "class-validator";

export class AddRoleToUserDto {
    @IsNumber()
    readonly roleId: number
}
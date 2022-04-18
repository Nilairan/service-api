import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Role } from "./role.model";

interface UserRoleCreationAttrs {
    value: string
    description: string
}

@Table({tableName: "user_roles"})
export class UserRole extends Model<UserRole, UserRoleCreationAttrs> { 

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;


}

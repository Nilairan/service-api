import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { UserRole } from "./user_role.model";

interface RoleCreationAttrs {
    value: string
    description: string
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttrs> { 

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    value: string;

    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}

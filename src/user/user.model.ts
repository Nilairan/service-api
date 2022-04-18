import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/role/role.model";
import { UserRole } from "src/role/user_role.model";

interface UserCreationAttrs {
    email: string;
    phone: string;
    password: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    email: string;

    @Column({type: DataType.STRING, allowNull: true})
    phone: string;

    @Column({type: DataType.STRING, allowNull: true})
    password: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];
}
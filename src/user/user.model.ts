import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/role/role.model";
import { UserRole } from "src/role/user_role.model";
import { Station } from "src/station/station.model";

interface UserCreationAttrs {
    email: string;
    phone: string;
    password: string;
    stationId: number;
    firstName: string;
    lastName: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true})
    email: string;

    @Column({type: DataType.STRING})
    phone: string;

    @Column({type: DataType.STRING})
    password: string;

    @Column({type: DataType.STRING})
    firstName: string

    @Column({type: DataType.STRING})
    lastName: string

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @ForeignKey(() => Station)
    @Column({type: DataType.INTEGER})
    stationId: number

    @BelongsTo(() => Station)
    station: Station
}
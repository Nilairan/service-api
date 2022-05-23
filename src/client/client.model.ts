import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Car } from "src/car/car.model";

interface ClientCreationAttrs {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Table({tableName: "clients"})
export class Client extends Model<Client, ClientCreationAttrs> {
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

	@HasMany(() => Car)
	cars: Car[]
}
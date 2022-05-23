import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "src/client/client.model";

interface CarCreationAttrs {
    mark: string
	model: string
	licensePlat: string
	clientId: number
}

@Table({tableName: "cars"})
export class Car extends Model<Car, CarCreationAttrs> {

	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

	@Column({type: DataType.STRING, unique: true})
	mark: string;

	@Column({type: DataType.STRING})
	model: string;

	@Column({type: DataType.STRING})
	licensePlat: string;

	@ForeignKey(() => Client)
	@Column({type: DataType.INTEGER})
	clientId: number

	@BelongsTo(() => Client)
    client: Client

}
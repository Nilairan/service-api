import { LocalDateTime } from "js-joda";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";


interface StationCreationAttrs {
    name: string
    address: string
    startWorkTime: LocalDateTime
	endWorkTime: LocalDateTime
}

@Table({tableName: "stations"})
export class Station extends Model<Station, StationCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

	@Column({type: DataType.STRING, unique: true})
	name: string;

	@Column({type: DataType.STRING})
	address: string;

	@Column({type: DataType.TIME})
	startWorkTime: LocalDateTime;

	@Column({type: DataType.TIME})
	endWorkTime: LocalDateTime;

	@HasMany(() => User)
	staff: User[]

}
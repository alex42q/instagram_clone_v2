import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table({
    tableName:"follows",
    timestamps:true
})

export class Follows extends Model {
    @Column({
        type:DataType.INTEGER
    })
    followingFromId!:number

    @Column({
        type:DataType.INTEGER
    })
    followingToId!:number
}

export type Follow = {
    followingFromId:string,
    followingToId:string
}
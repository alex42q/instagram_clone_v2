import { Column, Table, DataType, Model } from "sequelize-typescript";

@Table({
    tableName:"posts",
    timestamps:true
})

export class Posts extends Model {
    @Column({
        type:DataType.INTEGER
    })
    userId!:number

    @Column({
        type:DataType.STRING
    })
    image!:string

    @Column({
        type:DataType.STRING
    })
    description!:string

    @Column({
        type:DataType.INTEGER
    })
    likes!:number
}
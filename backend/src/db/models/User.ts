import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table({
    tableName:"Users",
    timestamps:true
})
export class User extends Model{
    @Column({
        type:DataType.STRING
    })
    email!:string

    @Column({
        type:DataType.STRING
    })
    password!:string

    @Column({
        type:DataType.STRING
    })
    firstName!:string

    @Column({
        type:DataType.STRING
    })
    lastName!:string

    @Column({
        type:DataType.STRING
    })
    phone!:string

    @Column({
        type:DataType.STRING,
        
    })
    profile_photo!:string

    @Column({
        type:DataType.STRING
    })
    username!:string
}

export type UserType = {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phone:string,
    profile_photo:string,
    username:string
}
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Follows } from "../models/Follows";
import { Posts } from "../models/Posts";

const sequelize = new Sequelize({
    host:"localhost",
    dialect:"postgres",
    username:"postgres",
    password:"123",
    database:"instagram",
    models:[
        User,
        Follows,
        Posts
    ]
})

User.hasMany(Follows, {
    foreignKey: 'followingFromId'
});

Follows.belongsTo(User, {
    as:"follows",
    foreignKey: 'followingFromId'
});

Follows.belongsTo(User, {
    as:"followers",
    foreignKey: 'followingToId'
});

User.hasMany(Posts, {
    as:"posts",
    foreignKey:"userId"
})

Posts.belongsTo(User, {
    as:"posts",
    foreignKey:"userId"
})

Posts.hasMany(Follows, {
    foreignKey:"followingFromId",
    as:"postFollows"
})

Follows.belongsTo(Posts, {
    foreignKey:"followingFromId",
    as:"postFollows"
})




sequelize.authenticate()
.then(() =>{
    console.log("Connections is success!")
})
.catch(err=>{
    console.log(err)
})

export default sequelize;
const sequelize = require("../config/connection")
const {User,Weblog} = require("../models")

const seed = async ()=>{
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username:"evan",
            password:"password!"
        },
        {
            email:"herman",
            password:"secret!"
        }
    ],{
        individualHooks:true
    })

    const weblogs = await Weblog.bulkCreate([
        {
            title:"testing",
            content:"testing testing 123",
            UserId:1
        },
        {
            title:"more testing",
            content:"more testing testin 123",
            UserId:2
        }
    ])
    process.exit(1)
}

seed();
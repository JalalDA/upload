const {Sequelize} = require("sequelize")

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    host : process.env.DB_HOST,
    dialect : 'mysql',
    dialectOptions : {
        
    }
})


module.exports = db
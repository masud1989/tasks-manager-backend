const mongoose = require('mongoose');
// let URI =`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.ergjf.mongodb.net/tasks-manager`
let URI = "mongodb+srv://testUser6666:testUser6666@cluster0.ergjf.mongodb.net/tasks-manager"


const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(URI) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
    module.exports = connectToMongo;
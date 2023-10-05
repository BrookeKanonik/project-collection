const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //not using useFindAndModify as it is outdated. all above items are to prevent errors in the console when possible
        })

        console.log(`MongoDB Connected ${conn.connection.host}`) //conn.connection.host is standard for mongoose
    } catch (err) {
        console.error(err)
        process.exit(1) //exit with error thus the 1 there
    }
}

module.exports = connectDB //we can run this in the app.js file
const mongoose = require("mongoose");
require("dotenv").config();

const connectionUrl = process.env.DATABASE_CONNECTION_URL || ''



const init = () => {
  mongoose.connect(connectionUrl,{useNewUrlParser: true});

  try{
    mongoose.connection.on('open',() => {
      console.log('Database connected')
    })
  }catch(error)
  {
    console.log(error)
  }
}


module.exports = {init}
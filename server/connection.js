const mongoose = require('mongoose');
require('dotenv').config()

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(`mongodb+srv://zafar_fast:${process.env.MONGODB_KEY}@cluster0.0wqlrb0.mongodb.net/thoughtbook?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;
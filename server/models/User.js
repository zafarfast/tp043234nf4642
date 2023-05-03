const { Schema, model } = require('mongoose');
const Post = require('./Post');

// Schema to create User model

const userSchema = new Schema(
  {
    email: {type: String, required:true, unique:true},
    firstName:{type: String},
    lastName:{type: String},
    password:{type: String},
    displayPicture:{type: String},
    posts:[
    {
      type: Schema.Types.ObjectId,
      ref: 'post',
    }],

    followed: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      }],
  
  },
  {
      toJSON: {
      virtuals: true,
    },
    id: false,
  }

);


// Initialize User model
const User = model('user', userSchema);

module.exports = User;

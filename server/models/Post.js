const mongoose = require('mongoose');
const commentsSchema = require('./Comment');

// Schema to create Posts model

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    imageUrl: {
        type: String,
        required: true,
      },
  
    likes:[
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }],

    comments: {
        type: [commentsSchema],
      },
    createdAt: { type: Date, default: Date.now },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize Post model

const Post = mongoose.model('post', postSchema);

module.exports = Post;

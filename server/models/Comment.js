const mongoose = require('mongoose');

// Schema to create Comments model
const commentsSchema = new mongoose.Schema(
  {
    commentBody: {
      type: String,
      required: true,
    },
    commentBy: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = commentsSchema;
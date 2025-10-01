
const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: [true, 'Please add a code snippet'],
  },
  programmingLanguage: {
    type: String,
    required: [true, 'Please add a programming language'],
  },
  tags: {
    type: [String],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Snippet', SnippetSchema);

const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  { _id: String, title: String, description: String, complete: Boolean },
  {
    versionKey: false,
  }
);

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };

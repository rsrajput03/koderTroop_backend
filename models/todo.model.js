const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  { _id: String, title: String, description: String, complete: Boolean },
  {
    versionKey: false,
  }
);

const progressSchema = mongoose.Schema(
  { _id: String, title: String, description: String, complete: Boolean },
  {
    versionKey: false,
  }
);

const qaSchema = mongoose.Schema(
  { _id: String, title: String, description: String, complete: Boolean },
  {
    versionKey: false,
  }
);

const doneSchema = mongoose.Schema(
  { _id: String, title: String, description: String, complete: Boolean },
  {
    versionKey: false,
  }
);

const TodoModel = mongoose.model("todo", todoSchema);
const ProgressModel = mongoose.model("progress", progressSchema);
const QaModel = mongoose.model("qa", qaSchema);
const DoneModel = mongoose.model("done", doneSchema);

module.exports = { TodoModel,ProgressModel,QaModel,DoneModel};

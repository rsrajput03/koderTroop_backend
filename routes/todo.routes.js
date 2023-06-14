const express = require("express");
const todoRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const { TodoModel } = require("../models/todo.model");

//task creation
todoRouter.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todoId = uuidv4();

    const todo = new TodoModel({
      _id: todoId,
      title,
      description,
      complete: false,
    });
    await todo.save();
    res.json({ message: "Todo added !", result: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//get the todos
todoRouter.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//search the query
todoRouter.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    let res = await TodoModel.find({ title: query });
    res.json({ result: res });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//delete the todo
todoRouter.delete("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    let result = await TodoModel.deleteOne({ _id: todoId });
    res.json({ message: "Todo deleted !", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

// update todos
todoRouter.patch("/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await TodoModel.findById(todoId);

    if (!todo) {
      return res.status(404).json({ "Todo not found": error });
    }

    todo.complete = !todo.complete;
    await todo.save();

    res.json({ message: "Todo updated !", result: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

module.exports = { todoRouter };

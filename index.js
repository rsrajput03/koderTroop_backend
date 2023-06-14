const express = require("express")
const { v4: uuidv4 } = require("uuid");
const {TodoModel} =require("./models/todo.model")
require("dotenv").config()
const cors = require("cors");
const { connection } = require("./db");

const app = express();

app.use(express.json())
app.use(cors());


//task creation
app.post("/", async (req, res) => {
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
app.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//search the query
app.get("/search", async (req, res) => {
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
app.delete("/:todoId", async (req, res) => {
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
app.patch("/:todoId", async (req, res) => {
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



app.listen(process.env.PORT,async ()=>{
    try {
      await connection 
      console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Not Connected to MongoDB")
        console.log(error)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
})
const express = require("express")
const { v4: uuidv4 } = require("uuid");
const {TodoModel, ProgressModel, QaModel, DoneModel} =require("./models/todo.model")
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



// progress
//task creation
app.post("/progress", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todoId = uuidv4();

    const todo = new ProgressModel({
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
app.get("/progress", async (req, res) => {
  try {
    const todos = await ProgressModel.find({});
    res.json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//search the query
app.get("/progress/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    let res = await ProgressModel.find({ title: query });
    res.json({ result: res });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//delete the todo
app.delete("/progress/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    let result = await ProgressModel.deleteOne({ _id: todoId });
    res.json({ message: "Todo deleted !", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

// update todos
app.patch("/progress/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await ProgressModel.findById(todoId);

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



// qa
//task creation
app.post("/qa", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todoId = uuidv4();

    const todo = new QaModel({
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
app.get("/qa", async (req, res) => {
  try {
    const todos = await QaModel.find({});
    res.json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//search the query
app.get("/qa/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    let res = await QaModel.find({ title: query });
    res.json({ result: res });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//delete the todo
app.delete("/qa/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    let result = await QaModel.deleteOne({ _id: todoId });
    res.json({ message: "Todo deleted !", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

// update todos
app.patch("/qa/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await QaModel.findById(todoId);

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


// done
//task creation
app.post("/done", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todoId = uuidv4();

    const todo = new DoneModel({
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
app.get("/done", async (req, res) => {
  try {
    const todos = await DoneModel.find({});
    res.json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//search the query
app.get("/done/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    let res = await DoneModel.find({ title: query });
    res.json({ result: res });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

//delete the todo
app.delete("/done/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    let result = await DoneModel.deleteOne({ _id: todoId });
    res.json({ message: "Todo deleted !", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "Error occur": error });
  }
});

// update todos
app.patch("/done/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await DoneModel.findById(todoId);

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




app.listen(8000,async ()=>{
    try {
      await connection 
      console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Not Connected to MongoDB")
        console.log(error)
    }
    console.log(`Server is running on port 8000`)
})
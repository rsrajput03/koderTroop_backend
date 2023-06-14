const express = require("express")


require("dotenv").config()
const cors = require("cors");
const { todoRouter } = require("./routes/todo.routes");
const { connection } = require("./db");

const app = express();

app.use(cors());
app.use(express.json())
app.use("/todos",todoRouter)


app.get("/",(req,res)=>{
  res.send("api work")
})




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
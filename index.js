const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => console.log("Server Up and running"));
  })
  .catch((err) => console.error(err));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("todo.ejs");
});

app.post("/", async (req, res) => {
  //console.log(req.body);
  const todoTask = new TodoTask({
    content: req.body.content
  });
  try{
    await todoTask.save();
    res.redirect("/");
  }catch(err) {
    res.status(500).send(err);
    res.redirect("/");
  }
});

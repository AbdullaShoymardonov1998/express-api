const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let initialTasks = [];

//getting all tasks
app.get("/tasks", (req, res) => {
  res.send(initialTasks);
});

//Create task;

let taskId = 0;
app.post("/tasks", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Missing name or description" });
  }
  initialTasks.push({
    id: taskId + 1,
    name,
    description,
    isActive: true,
  });
  taskId++;
  res.status(201).json({message:'Task is created'}); 
});

//get task by id

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const idNew = parseInt(id);
  const taskById = initialTasks.find((e) => e.id === idNew);
  if (!taskById) {
    res.status(404).json({ message: "Task not found" });
  }
  res.send(taskById);
});

//update task

app.put("/tasks/:id", (req, res) => {
  for (let i = 0; i < initialTasks.length; i++) {
    if (initialTasks[i].id === parseInt(req.params.id)) {
      initialTasks[i].name = req.body.name;
      initialTasks[i].description = req.body.description;
      initialTasks[i].isActive = req.body.isActive;
    }
    return res.send("Task is updated");
  }
  res.send("Task not found");
});

//delete task

app.delete("/tasks/:id", (req, res) => {
        const existingTask = initialTasks.find((task) => task.id === parseInt(req.params.id));
        if (!existingTask) {
            res.status(400).json({message: "Task doesn't exist "});
        }
        initialTasks = initialTasks.filter((e) => e.id !== parseInt(req.params.id));
        res.json({message:`Task with an id ${req.params.id} is deleted ` });
});

app.get("*", function (req, res) {
  res.status(404).send("Page not found!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();

app.use(express.json());

let items = [];
let currentId = 1;

// Dummy login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "testuser" && password === "password") {
    return res.status(200).json({ token: "dummy-token" });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// Create item
app.post("/items", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  const newItem = { id: currentId++, task };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Get all items
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

// Update item
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;

  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  item.task = task;
  res.status(200).json(item);
});

// Delete item
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(204).send(); // Or change to 404 if preferred
  }

  items.splice(index, 1);
  res.status(204).send();
});

// Export for tests
module.exports = app;

// Run server only if executed directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

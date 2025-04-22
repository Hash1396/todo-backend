const express = require('express');
const cors = require('cors');
const boardsRouter = require('./src/routes/boards');
const tasksRouter = require('./src/routes/tasks');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(boardsRouter);
app.use(tasksRouter);

// Health check route
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
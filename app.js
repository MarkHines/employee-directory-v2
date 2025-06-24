import express from "express";
const app = express();
export default app;

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use(express.json());

import employeeRouter from './api/employeeRouter'
app.use(`/employees`, employeeRouter);

app.use((error, request, response, next) => {
  response.status(500).send({
    message: error.message || `Something went wrong`
  });
});

import express from 'express';
import employees from "#db/employees";

const employeeRouter = express.Router();

const addEmployee = (employeeName) => {
  const newEmployee = {
    id: employees.length + 1,
    name: employeeName,
  }

  employees.push(newEmployee)
  return newEmployee;
}

employeeRouter.route("/").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
employeeRouter.route("/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

employeeRouter.post(`/`, (request, response, next) => {
  if(!request.body || !request.body.name) {
    response.status(400).send(`No request body`)
  }
  
  response.status(201).send(addEmployee(request.body.name))
})

export default employeeRouter
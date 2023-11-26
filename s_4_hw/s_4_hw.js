const express = require("express");
const path = require("path");
const fs = require("fs");
const { check } = require("./valid/valid");
const { userSchema } = require("./valid/joi");
const app = express();
const path = path.join(__dirname, "s_4_hw.json");
let uniqueID = 0;
const read = [];

function writeJson(users, path) {
  fs.writeFile(path, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function readJson(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

app.use(express.json());

app.get("/users", (req, res) => {
  const read = readJson(path);
  res.send({ read });
});

app.post("/users", check(userSchema), (req, res) => {
  const read = readJson(path);
  uniqueID += 1;

  read.push({
    id: uniqueID,
    ...req.body,
  });

  res.send({
    id: uniqueID,
  });
  writeJson(read, path);
});

app.put("/users/:id", check(userSchema), (req, res) => {
  const read = readJson(path);
  const user = read.find((user) => user.id === Number(req.params.id));

  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.city = req.body.city;

    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
  writeJson(read, path);
});

app.get("/users/:id", (req, res) => {
  const read = readJson(path);
  const user = read.find((user) => user.id === Number(req.params.id));

  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const read = readJson(path);
  const user = read.find((user) => user.id === Number(req.params.id));

  if (user) {
    const userIndex = read.indexOf(user);
    read.splice(userIndex, 1);
    writeJson(read, path);
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.use((req, res) => {
  res.status(404).send({
    message: "URL not found1",
  });
});

app.listen(3000);

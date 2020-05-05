const express = require("express");

const server = express();
server.use(express.json());

const shortid = require("shortid");

server.listen(5000, () =>
  console.log("\n Api is running on localhost:5000 \n")
);

//user:

let user = [
  {
    id: shortid.generate(),
    name: "Bob Smith",
    bio: "Just your average joe but more like your average Bob. Get it?",
  },
];

//Ajax requests:

server.post("/api/users", function (req, res) {
  const newUser = req.body;
  newUser.id = shortid.generate();
  if (
    newUser.name === null ||
    newUser.bio === null ||
    newUser.name === "" ||
    newUser.bio === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!newUser) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else user.push(newUser);
  res.status(201).json(newUser);
});

server.get("/api/users", function (req, res) {
  if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else res.json(user);
});

server.get("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const userId = user.filter((indU) => indU.id == id);
  if (id === undefined) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!user) {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  } else res.status(200).json(userId);
});

server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const userI = user.filter((indUser) => indUser.id == id);
  if (res) {
    if (userI.length != 0) {
      user = user.filter((user) => user.id != id);
      res.status(200).json(userI);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});

server.put("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const newUser = req.body;
  newUser.id = shortid.generate();
  let user1 = user.find((indU) => indU.id === id);
  console.log(user);
  if (!user1) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (
    newUser.name === null ||
    newUser.name === "" ||
    newUser.bio === null ||
    newUser.bio === ""
  ) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!newUser) {
    return res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  } else res.status(200).json(user1);
});

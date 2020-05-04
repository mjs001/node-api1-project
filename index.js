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
  if (
    user.name === null ||
    user.bio === null ||
    user.name === "" ||
    user.bio === ""
  ) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (!newUser) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else user.push(newUser) && res.status(201).json(newUser);
});

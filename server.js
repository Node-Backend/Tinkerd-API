const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const server = express(); //create server variable
server.use(bodyParser.json());//use body parser
server.use(cors());// use cors

const sendUserError = (msg, res) => {
    res.status(422);
    res.json({ Error: msg });
    return;
  };


  let friends = [
    {
      id: 1,
      name: 'Marie Archange',
      age: 43,
      email: 'marie@friends.com'
    },
    {
      id: 2,
      name: 'John Smith',
      age: 28,
      email: 'john@friends.com'
    },
    {
      id: 3,
      name: 'Mike Jones',
      age: 45,
      email: 'mike@friends.com'
    },
    {
      id: 4,
      name: 'David Williams',
      age: 35,
      email: 'david@friends.com'
    },
    {
      id: 5,
      name: 'Juan Lewis',
      age: 30,
      email: 'juan@friends.com'
    },
    {
      id: 6,
      name: 'Paul Daniel',
      age: 39,
      email: 'paul@friends.com'
    }
  ];
  

 
  let friendId = 7;

  server.get("/", (req, res) => {
    res.json({message: "Welcome to the server"});
  });

  server.get("/friends", (req, res) => {
    res.json(friends);
  });

  server.get("/friendById/:id", (req, res) => {
    const { id } = req.params;
    const findFriendById = friend => {
      return friend.id == id;
    };
    const foundFriend = friends.find(findFriendById);
    if (!foundFriend) {
      return sendUserError("No Friend found by that ID", res);
    } else {
      res.json(foundFriend);
    }
  });

  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
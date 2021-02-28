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

//Dummy data
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
  

 //for adding new friends
  let friendId = 7;


//Gets the server message
  server.get("/", (req, res) => {
    res.json({message: "Welcome to the server"});
  });

//Gets the entire friend list
  server.get("/friends", (req, res) => {
    res.json(friends);
  });


//Gets Friend by ID
  server.get("/friendById/:id", (req, res) => {
      //Pulls the id off the url
    const { id } = req.params;

    //finds the friend with that id
    const findFriendById = friend => {
      return friend.id == id;
    };
    const foundFriend = friends.find(findFriendById);

    //if no friend with that id exists
    if (!foundFriend) {
      return sendUserError("No Friend found by that ID", res);
    } else {
      res.json(foundFriend);
    }
  });

//Adds a friend to the list
  server.post("/friends", (req, res) => {
      //Pulls name, age and email off the request body
    const { name, age, email } = req.body;

    //adds the id(which is whatever is stored in the friendId variable), name, age and email to the newFriend variable
    const newFriend = {  id: friendId, name, age, email};

    //if no name, age or email is added
    if (!name || !age || !email) {
      return sendUserError(
        "You forgot something! Name, Age, and Email are all required to create an friend in the friend DB.",
        res
      );
    }
    //checks to see if the friend with that name already exixts
    const findFriendByName = friend => {
      return friend.name === name;
    };
    if (friends.find(findFriendByName)) {
      return sendUserError(
        `NO WAY!!!! ${name} already exists in the friend DB.`,
        res
      );
    }
  
//add the newFriend to the friends list
    friends.push(newFriend);
    friendId++;//add one to the friendId variable, so the next friend added does not have the same id
    res.json(friends);
  });


//Update friend
server.put("/friends/:id", (req, res) => {
    //pulls the id off of the url
    const { id } = req.params;

    //pulls the name, age and email off of the body of the request
    const { name, age, email } = req.body;
    
    //finds the friend with the specified id and returns that id
    const findFriendById = friend => {
      return friend.id == id;
    };

//
    const foundFriend = friends.find(findFriendById);

    //if foundFriend is null
    if (!foundFriend) {
      return sendUserError("No Friend found with that ID", res);


    } else {
        //if friend found
      if (name) foundFriend.name = name;//update name
      if (age) foundFriend.age = age;//update age
      if (email) foundFriend.email = email;//update email
      res.json(friends);
    }
  });


//Delete Friend
server.delete("/friends/:id", (req, res) => {
    //pulls the id off of the url
    const { id } = req.params;

    //finds the friend with the id from the pramas, and stores it in the foundFriend variable
    const foundFriend = friends.find(friend => friend.id == id);
  
    if (foundFriend) { //if foundFriend is not null

        //setting friends to all the firends in the list except the friend with the specified id
      friends = friends.filter(friend => friend.id != id);
      res.status(200).json(friends);
    } else {
      sendUserError("No friend by that ID exists in the friend DB", res);
    }
  });





  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
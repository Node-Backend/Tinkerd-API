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
  let tinkers = [
    {
      id: 1,
      name: 'Marie Archange',
      age: 43,
      email: 'marie@tinkers.com'
    },
    {
      id: 2,
      name: 'John Smith',
      age: 28,
      email: 'john@tinkers.com'
    },
    {
      id: 3,
      name: 'Mike Jones',
      age: 45,
      email: 'mike@tinkers.com'
    },
    {
      id: 4,
      name: 'David Williams',
      age: 35,
      email: 'david@tinkers.com'
    },
    {
      id: 5,
      name: 'Juan Lewis',
      age: 30,
      email: 'juan@tinkers.com'
    },
    {
      id: 6,
      name: 'Paul Daniel',
      age: 39,
      email: 'paul@tinkers.com'
    }
  ];
  

 //for adding new tinkers
  let tinkerId = 7;


//Gets the server message
  server.get("/", (req, res) => {
    res.json({message: "Welcome to the server"});
  });

//Gets the entire tinker list
  server.get("/tinkers", (req, res) => {
    res.json(tinkers);
  });


//Gets Tinker by ID
  server.get("/tinkerById/:id", (req, res) => {
      //Pulls the id off the url
    const { id } = req.params;

    //finds the tinker with that id
    const findTinkerById = tinker => {
      return tinker.id == id;
    };
    const foundTinker = tinkers.find(findTinkerById);

    //if no tinker with that id exists
    if (!foundTinker) {
      return sendUserError("No Tinker found by that ID", res);
    } else {
      res.json(foundTinker);
    }
  });

//Adds a tinker to the list
  server.post("/tinkers", (req, res) => {
      //Pulls name, age and email off the request body
    const { name, age, email } = req.body;

    //adds the id(which is whatever is stored in the tinkerId variable), name, age and email to the newTinker variable
    const newTinker = {  id: tinkerId, name, age, email};

    //if no name, age or email is added
    if (!name || !age || !email) {
      return sendUserError(
        "You forgot something! Name, Age, and Email are all required to create an tinker in the tinker DB.",
        res
      );
    }
    //checks to see if the tinker with that name already exixts
    const findTinkerByName = tinker => {
      return tinker.name === name;
    };
    if (tinkers.find(findTinkerByName)) {
      return sendUserError(
        `NO WAY!!!! ${name} already exists in the tinker DB.`,
        res
      );
    }
  
//add the newTinker to the tinkers list
    tinkers.push(newTinker);
    tinkerId++;//add one to the tinkerId variable, so the next tinker added does not have the same id
    res.json(tinkers);
  });


//Update tinker
server.put("/tinkers/:id", (req, res) => {
    //pulls the id off of the url
    const { id } = req.params;

    //pulls the name, age and email off of the body of the request
    const { name, age, email } = req.body;
    
    //finds the tinker with the specified id and returns that id
    const findTinkerById = tinker => {
      return tinker.id == id;
    };

//
    const foundTinker = tinkers.find(findTinkerById);

    //if foundTinker is null
    if (!foundTinker) {
      return sendUserError("No Tinker found with that ID", res);


    } else {
        //if tinker found
      if (name) foundTinker.name = name;//update name
      if (age) foundTinker.age = age;//update age
      if (email) foundTinker.email = email;//update email
      res.json(tinkers);
    }
  });


//Delete Tinker
server.delete("/tinkers/:id", (req, res) => {
    //pulls the id off of the url
    const { id } = req.params;

    //finds the tinker with the id from the pramas, and stores it in the foundTinker variable
    const foundTinker = tinkers.find(tinker => tinker.id == id);
  
    if (foundTinker) { //if foundTinker is not null

        //setting tinkers to all the firends in the list except the tinker with the specified id
      tinkers = tinkers.filter(tinker => tinker.id != id);
      res.status(200).json(tinkers);
    } else {
      sendUserError("No tinker by that ID exists in the tinker DB", res);
    }
  });





  server.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
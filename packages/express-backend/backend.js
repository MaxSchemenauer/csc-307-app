// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};


const findUserByName = (name) => {
    const filteredUsers = users.users_list.filter((user) => user.name.toLowerCase() === name.toLowerCase());
    console.log("Filtered Users:", filteredUsers);
    return filteredUsers;
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);


const generateRandomId = () => {
    // Generate a random number and convert it to a hexadecimal string
    return Math.random().toString(16).slice(2);
};

const addUser = (user) => {
    // Generate a random ID
    const id = generateRandomId();
    // Add the ID to the user object
    const userWithId = { ...user, id };
    // Push the user object with ID to the users_list
    users["users_list"].push(userWithId);
    // Return the user object with ID
    return userWithId;
};

// POST route handler for adding a user
app.post("/users", (req, res) => {
    // Get the user data from the request body
    const userToAdd = req.body;
    // Add the user with a generated ID
    const newUser = addUser(userToAdd);
    // Send a response with status code 201 (Content Created) and the newly created user object
    res.status(201).send(newUser);
});

// DELETE route handler for deleting a user by ID
app.delete("/users/:id", (req, res) => {
    const idToDelete = req.params.id;
    const index = users.users_list.findIndex(user => user.id === idToDelete);
    if (index !== -1) {
        // Remove the user from the users_list array
        users.users_list.splice(index, 1);
        // Send a response with status code 204 (No Content)
        res.status(204).send();
    } else {
        // If the user with the given ID is not found, send a 404 response
        res.status(404).send("User not found.");
    }
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});



app.get("/", (req, res) => {
    res.send("did you mean to go to http://localhost:8000/users");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});


// src/MyApp.jsx
import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";




function MyApp() {
  const [characters, setCharacters] = useState([]);


  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.status === 204) {
            // If the delete operation is successful, update the state
            setCharacters(characters.filter(character => character._id !== String(id)));
        } else if (response.status === 404) {
            // If the user is not found, log an error message
            console.error("User not found.");
        } else {
            // If any other error occurs, log an error message
            console.error("Failed to delete user.");
        }
    })
    .catch(error => {
        // If an error occurs during the fetch request, log the error
        console.error("Error deleting user:", error);
    });
}



  function updateList(person) { 
    postUser(person)
      .then(response => {
        if (response.status === 201) {
          return response.json(); // Extract JSON data from the response
        } else {
          throw new Error("Failed to add user.");
        }
      })
      .then(data => {
        setCharacters([...characters, data]); // Update state with the new user object
      })
      .catch(error => {
        console.error("Error adding user:", error);
      });
}


  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);


  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}



export default MyApp;
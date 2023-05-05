import React, {useState} from "react";
import Footer from "./footer";

// import the mutation and the useMutation hook

import {ADD_COMMENT, ADD_USER, DELETE_COMMENT, DELETE_POST, DELETE_USER} from "../utils/mutations";
// import { ADD_POST } from "../utils/mutations";
// import { ADD_COMMENT } from "../utils/mutations";
// import { DELETE_USER } from "../utils/mutations";
// import { DELETE_POST } from "../utils/mutations";
// import { DELETE_COMMENT } from "../utils/mutations";
import {useMutation} from "@apollo/client";



export default function Signup() {
  // create a mutation function
  const [addUser] = useMutation(ADD_USER);
//   const [addPost] = useMutation(ADD_POST);
// const [addComment] = useMutation(ADD_COMMENT);
// const [deleteUser] = useMutation(DELETE_USER);
// const [deletePost] = useMutation(DELETE_POST);
// const [deleteComment] = useMutation(DELETE_COMMENT);


  // create a state for form values
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  // handle submit for when the form has been submitted
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    try {
      // user the mutation function that you have defined above
      // make sure to pass the correct variables
      const response = await addUser({
        variables: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        },
      });

      console.log(response);

      window.location.href = "/userHome";
    } catch (err) {
      console.log(err);
    }
  }

  // function for tracking the values for each input elements
  function handleChange(event) {
    const name = event.target.name;

    setFormData({
      ...formData,
      [name]: event.target.value,
    });

    // if (name == "firstName") {
    //   setFormData({
    //     ...formData,
    //     firstName: event.target.value,
    //   });
    // }

    // if (name == "lastName") {
    //     setFormData({
    //       ...formData,
    //       lastName: event.target.value,
    //     });
    //   }
  }

  return (
    <>
      <div id="signup-form-container">
        <h1 id="thoughtbook-title-text-login-page">
          ThoughtBook{" "}
          <img id="logo-login-page" src="./images/comment.png" alt=""></img>
        </h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label for="email">First Name</label>
          <br></br>
          {/* make sure to provide a name for each input element */}
          <input type="text" name="firstName" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label for="email">Last Name</label>
          <br></br>
          <input type="text" name="lastName" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label for="email">Email</label>
          <br></br>
          <input type="text" name="email" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label for="password">Password</label>
          <br></br>

          <input
            type="password"
            name="password"
            onChange={handleChange}
          ></input>
          <br></br>
          <br></br>
          <button id="login-button">Signup </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

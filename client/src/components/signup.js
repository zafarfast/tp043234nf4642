import React, {useState} from "react";
import Footer from "./footer";
// import the mutation and the useMutation hook
import {ADD_COMMENT, ADD_USER, DELETE_COMMENT, DELETE_POST, DELETE_USER, USER_LOGIN} from "../utils/mutations";
import {useMutation} from "@apollo/client";



export default function Signup() {
  var validator = require('validator');
  // create a mutation function
  const [addUser] = useMutation(ADD_USER);

  // create a state for form values
  const [msg, setmsg] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  // handle submit for when the form has been submitted
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(formData);
    if (validator.isEmail(formData.email))
    {
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
  
        // console.log(response);
  
        window.location.href = "#/login";
      } catch (err) {
        console.log(err);
      }
    }
    else 
    {
      setmsg('Email is not valid')
    }

  }

  // function for tracking the values for each input elements
  function handleChange(event) {
    const name = event.target.name;

    setFormData({
      ...formData,
      [name]: event.target.value,
    });

  }

  return (
    <>
      <div id="signup-form-container">
        <h1 id="thoughtbook-title-text-login-page">
          ThoughtBook{" "}
          <img id="logo-login-page" src="./images/logo.svg" alt=""></img>
        </h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">First Name</label>
          <br></br>
          {/* make sure to provide a name for each input element */}
          <input type="text" name="firstName" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label htmlFor="email">Last Name</label>
          <br></br>
          <input type="text" name="lastName" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label for="email">Email</label>
          <br></br>
          <input type="text" name="email" onChange={handleChange}></input>
          <p>{msg}</p>
          <br></br>
          <label htmlFor="password">Password</label>
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

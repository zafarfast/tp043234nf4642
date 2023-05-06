import React, { useState } from 'react';
import Footer from './footer';
import {useMutation} from "@apollo/client";

import {USER_LOGIN} from "../utils/mutations";

export default function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
      const [userlogin] = useMutation(USER_LOGIN);

      async function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
    
        try {
          // user the mutation function that you have defined above
          // make sure to pass the correct variables
          const response = await userlogin({
            variables: {
              email: formData.email,
              password: formData.password,
            },
          });
    
          console.log(response);
    
          if (response === true) {window.location.href = "#/userHome"} else {window.location.href = "/homePage"};
        } catch (err) {
          console.log(err);
        }
      }
    
    return <>
    <div id="login-form-container">
        <h1 id="thoughtbook-title-text-login-page">ThoughtBook <img id="logo-login-page" src="./images/comment.png" alt=""></img></h1>
        <br></br>
        <form action="">
            <label for="email">Email</label>
            <br></br>
            <input type="text"></input>
            <br></br>
            <br></br>
            <label for="password">Password</label>
            <br></br>
            
            <input type="password"></input>
            <br></br>
            <button id="login-button">Login </button>
        </form>
        <br></br>
        <p id="signup-invite-text">Dont have an account? <a href="#/signup">Sign-up</a></p>
    </div>

    <Footer />
    </>

}
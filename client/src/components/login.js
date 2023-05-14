import React, {useState} from "react";
// import { useNavigate } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

import Footer from "./footer";
import {useMutation} from "@apollo/client";

import {USER_LOGIN} from "../utils/mutations";

import Auth from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [loginErrorMessage, setloginErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userlogin] = useMutation(USER_LOGIN);

  async function handleSubmit(event) {
    event.preventDefault();
    // let response = null;
    // try {
    try {
      const response = await userlogin({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(`Form Data: ${formData}`);
      console.log(response?.data.userLogin);
      // Auth.login(response.data.userLogin.token)
      if (response.data.userLogin.token !== null) {
        Auth.login(response.data.userLogin.token);
        navigate("/userHome");
      } else {
        setloginErrorMessage("Username of password is incorrect");

        // navigate('/userHome');
      }

      //     } catch (err) {
      //     console.log(err);
      //   }
    } catch (err) {
      console.log(err);
    }

    //     if (response?.data.userLogin === true) {
    //         localStorage.setItem("userEmail", formData.email);
    //         window.location.href = "#/userHome"
    //     }
    //     else if (response?.data.userLogin === false) { setloginErrorMessage("Username of password is incorrect") } else { console.log("Response not available") }
    // }
    // console.log(formData)
  }
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <div id="login-form-container">
        <h1 id="thoughtbook-title-text-login-page">
          ThoughtBook{" "}
          <img id="logo-login-page" src="./images/logo.svg" alt=""></img>
        </h1>
        <br></br>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br></br>
          <input type="text" name="email" onChange={handleChange}></input>
          <br></br>
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>

          <input
            type="password"
            name="password"
            onChange={handleChange}
          ></input>
          <br></br>
          <button id="login-button">Login </button>
        </form>

        <p id="signup-invite-text">
          Dont have an account? <a href="#/signup">Sign-up</a>
        </p>
      </div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h5>{loginErrorMessage}</h5>
      </div>

      <Footer />
    </>
  );
}

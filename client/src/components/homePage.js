import React, {useState} from "react";
import Login from "./login";
import {Link} from "react-router-dom";
import Footer from "./footer";
import StripeButton from "./stripe";


export default function HomePage() {
  const token = localStorage.getItem("id_token");

  // if (token) {
  //   console.log(token)
  //   // useNavigate("/login");
  //   window.location.href = "#/userHome";
  //   window.location.reload()
  // }

  const handleStripeSuccess = () => {
    console.log("success");
  };
  const handleStripeFail = () => {
    console.log("fail");
  };
  return (
    <>
      <div id="main-page-container">
        <div id="main-left">
          <div id="title-div">
            <img id="logo" src="./images/logo.svg" alt=""></img>
            <h1 id="thoughtbook-title-text">ThoughtBook </h1>
          </div>

          <h3 id="thoughtbook-title-text2">Give Visuals To Your Thoughts</h3>

          <h5 id="thoughtbook-title-text3">
            ThoughtBook is a social media platform where you can create images
            through the power of AI and share it with the world.
            <br></br>
            <br></br>
          </h5>
          <StripeButton />
          <div id="buttons">
            <Link to="/login">
              {" "}
              <button id="login-button">Login </button>
            </Link>
            <Link to="/signup">
              {" "}
              <button id="signup-button">Sign-up </button>
            </Link>
            
          </div>
        </div>

        <div id="main-right">
          <img
            src="./images/Having coffee with my dog (2).gif"
            alt=""
          ></img>
        </div>
      </div>
      <Footer />
    </>
  );
}

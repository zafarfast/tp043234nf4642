import React, { useState } from 'react';
import Footer from './footer';


export default function //Signup() {
    return <>
        <div id="signup-form-container">
            <h1 id="thoughtbook-title-text-login-page">ThoughtBook <img id="logo-login-page" src="./images/comment.png" alt=""></img></h1>
            <br></br>
            <form action="">
                <label for="email">First Name</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label for="email">Last Name</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label for="email">Email</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label for="password">Password</label>
                <br></br>

                <input type="password"></input>
                <br></br>
                <br></br>
                <button id="login-button">Signup </button>
            </form>
        </div>

        <Footer />

    </>

}
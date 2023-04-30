import React, { useState } from 'react';
import Footer from './footer';


export default function Login() {
    return <>
    <div id="login-form-container">
        <h1 id="thoughtbook-title-text-login-page">ThoughtBook <img id="logo-login-page" src="comment.png" alt=""></img></h1>
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
        <p id="signup-invite-text">Dont have an account? <a href="/signup">Sign-up</a></p>
    </div>

    <Footer />
    </>

}
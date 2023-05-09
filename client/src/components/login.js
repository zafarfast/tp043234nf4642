import React, { useState } from 'react';
import Footer from './footer';
import { useMutation } from "@apollo/client";

import { USER_LOGIN } from "../utils/mutations";

import Auth from "../utils/auth"

export default function Login() {

    const [loginErrorMessage, setloginErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [userlogin] = useMutation(USER_LOGIN);

    async function handleSubmit(event) {
        event.preventDefault();
        let response = null;

        response = await userlogin({
            variables: {
                "username": formData.email,
                "password": formData.password,
            },
        });
        console.log(`Form Data: ${formData}`);

        console.log(response?.data.userLogin);

        if (response?.data.userLogin === true) {
            localStorage.setItem("userEmail", formData.email);
            window.location.href = "#/userHome"
        }
        else if (response?.data.userLogin === false) { setloginErrorMessage("Username of password is incorrect") } else { console.log("Response not available") }
    }


    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

        // console.log(formData)
    }

    return <>
        <div id="login-form-container">
            <h1 id="thoughtbook-title-text-login-page">ThoughtBook <img id="logo-login-page" src="./images/logo.svg" alt=""></img></h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label for="email">Email</label>
                <br></br>
                <input name="email" value={formData.firstName} onChange={handleChange} type="text"></input>
                <br></br>
                <br></br>
                <label for="password">Password</label>
                <br></br>
                <input name="password" value={formData.firstName} onChange={handleChange} type="password"></input>
                <br></br>
                <p id="signup-invite-text">{loginErrorMessage}</p>
                <button id="login-button">Login </button>
            </form>
       
            <p id="signup-invite-text">Dont have an account? <a href="#/signup">Sign-up</a></p>
        </div>

        <Footer />
    </>

}
import React, { useState, useEffect } from 'react';
import Footer from './footer';

import { GET_USER } from '../utils/queries';
import { EDIT_USER } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

// import Auth from "../utils/auth"


export default function UserProfile() {

    const {loading, data} = useQuery(GET_USER, {
        variables: {
            email: "zafar@hotmail.com"
            // email: Auth.getUser().email
        }
    })

    const userData = data?.findUser || {}

    const [formData, setFormData] = useState({
        "userId":"",
        "email":"", 
        "firstName":"",
        "lastName":"",
        "password": ""
    })


    useEffect(() => {
        setFormData({
            "userId": userData._id,
            "email": userData.email, 
            "firstName": userData.firstName,
            "lastName": userData.lastName,
            "password": ""
        })

        console.log(userData)
    }, [userData])

    const [editUser] = useMutation(EDIT_USER)


    async function handleSubmit(event) {
        event.preventDefault();


        await editUser({
            variables: {
                "userId": formData.userId,
                "email": formData.email, 
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "password": formData.password
            }
        })

        window.location.href = "#/userProfile"

    }

    function handleChange (event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

        console.log(formData)
    }

    if(loading) {
        return (
            <h2>Still loading, please wait!</h2>
        )
    }

    return <>
        <div id="signup-form-container">
            <h1 id="thoughtbook-title-text-login-page">Update User <img id="logo-login-page" src="./images/logo.svg" alt=""></img></h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label for="email">First Name</label>
                <br></br>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label for="email">Last Name</label>
                <br></br>
                <input type="text"  name="lastName" value={formData.lastName} onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label for="email">Email</label>
                <br></br>
                <input type="text"  name="email" value={formData.email} onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label for="password">Password</label>
                <br></br>

                <input type="password" name="password" onChange={handleChange}></input>
                <br></br>
                <br></br>
                <button id="login-button">Save Edit</button>
            </form>
        </div>

        <Footer />

    </>

}
import React, {useState, useEffect} from "react";
import Footer from "./footer";
import {Link} from "react-router-dom";

import {GET_USER} from "../utils/queries";
import {EDIT_USER} from "../utils/mutations";
import {useMutation, useQuery} from "@apollo/client";

// import Auth from "../utils/auth"
import jwt_decode from "jwt-decode";


export default function UserProfile() {
  const avatarList = [
    "./images/avatars/avatar1.jpg",
    "./images/avatars/avatar2.jpg",
  ]



  const token1 = localStorage.getItem("id_token");
  const decoded_token = jwt_decode(token1);
  //   const userId = decoded_token.data._id;
  //   const email = decoded_token.data.email;

  const {loading, data} = useQuery(GET_USER);

  const userData = data?.findUser || {};

  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      userId: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: "",
    });

    console.log(userData);
  }, [userData]);

  const [editUser] = useMutation(EDIT_USER);

  async function handleSubmit(event) {
    event.preventDefault();

    const selectedAvatar = document.querySelector('input[name="selected_avatar"]:checked').value

    console.log(selectedAvatar)
    await editUser({
      variables: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        displayPicture: selectedAvatar
      },
    });

    window.location.href = "#/userHome";
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    console.log(formData);
  }

  if (loading) {
    return <h2>Still loading, please wait!</h2>;
  }

  return (
    <>
      <div id="signup-form-container">
      <img
              id="user-profile-pic_userprofilepage"
              src={userData.displayPicture}
              alt=""
       ></img>

        <Link to="/userHome">
          {" "}
          <h1 id="thoughtbook-title-text-login-page">
            User Profile{" "}
            <img id="logo-login-page" src="./images/logo.svg" alt=""></img>
          </h1>
        </Link>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label for="email">First Name</label>
          <br></br>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          ></input>
          <br></br>
          <br></br>
          <label for="email">Last Name</label>
          <br></br>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
          <br></br>
          <br></br>
          <label for="email">Email</label>
          <br></br>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
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

          <div>
          <label for="selected_avatar">Avatar</label>
            {avatarList.map(avatar => {
              return (
                <div>
                    <input type="radio" name="selected_avatar" value={avatar} defaultChecked={avatar == userData?.displayPicture}/>
                    <img style={{
                      width: "30px"
                    }} src={avatar}/>
                  </div>
              )
            })}
          </div>

          <br></br>
          <br></br>
          <button id="login-button2">Save Edit</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

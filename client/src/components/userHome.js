import React, { useState } from 'react';
import { gql , useQuery} from '@apollo/client';

import { Link } from 'react-router-dom'
import UserPost from './userPost'

export default function UserHome() {
   const QUERY_USERS = gql`
    query findUsers {
        findUsers {
            email
            image
            firstName
            id
            thought
        }
      }
       `;

  const {  data } = useQuery(QUERY_USERS);

  const findUsers = data?.findUsers || []
//   if (loading){
//     console.log(loading)
//   }

//   if(err)
//   {
//     console.log(err)

//   }
  if(findUsers)
  {
      console.log(findUsers)
  }

    return <>
        <header>
            <div id="title-div-user-home">
                <img id="logo-main-page" src="./images/comment.png" alt=""></img>
                <h1 id="thoughtbook-title-text-login-page">ThoughtBook </h1>
            </div>

            <div id="user-profile-pic">
                <img id="user-profile-pic" src="./images/user-profile-pic.jpg" alt=""></img>
            </div>
        </header>


        <div id="search-form-container">
            <form id="search-form" action="">
                <input id="search-field" placeholder="Tell us what you are thinking today." type="text"></input>
                <button id="search-button">Render </button>
            </form>
        </div>

        <div id="generated-image-container">
            <p id="user-thought-title-preview">New Post Preview</p>

            <p id="user-thought-preview">Having coffee with my dog on a sunny morning. He is looking at me like my bestie </p>

            <div id="generated-image">
                <img src="./images/travelling the world alone.jpg" alt=""></img>
                <br></br>
            </div>
            <div>

                <button id="post-button">Post </button>
                <button id="re-generate-button">Generate New Image </button>
            </div>
        </div>
        <div id="thoughts-chain"> 

        <UserPost src={findUsers[0]?.image} thoughtText={findUsers[0]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        <UserPost src={findUsers[1]?.image} thoughtText={findUsers[1]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        <UserPost src={findUsers[2]?.image} thoughtText={findUsers[2]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        <UserPost src={findUsers[0]?.image} thoughtText={findUsers[0]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        <UserPost src={findUsers[1]?.image} thoughtText={findUsers[1]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        <UserPost src={findUsers[2]?.image} thoughtText={findUsers[2]?.thought} userProfilePic="./images/user-profile-pic.jpg"/>
        </div>
    </>

}
import React, { useState } from 'react';


export default function UserPost(props)
{
return <>
    <div id="user-thought-container">
        <div id="user-thought-header">
            <img id="user-profile-pic" src={props.userProfilePic} alt=""></img>
            <p id="user-thought">{props.thoughtText}</p>
            <button id="follow-button">Follow </button>
        </div>

        <div id="user-thought-image">
            <img src={props.src} alt=""></img>
        </div>
    </div>
    </>

}
import React, { useState } from 'react';


export default function UserPost(props)
{
    
    let createdAtDate = new Date(parseInt(props.createdAt));
    // console.log(createdAtDate)
    let date = createdAtDate.toString()
    date = date.split(' ')
    
return <>
    <div data-id={props.id} id="user-thought-container">
        <div id="user-thought-header">
            <div id="post-profile-pic">
            <img id="user-profile-pic" src={props.userProfilePic} alt=""></img>
            

            </div>

            <p id="user-thought">{props.thoughtText}</p>
            <div id="post-follow-button">

            <button id="follow-button">Follow </button>
            </div>

        </div>

        <div id="user-thought-image">
            <div id="flex2">
            <span id="user-name">{props.firstName}</span>
            <span id="timestamp">{'Posted on '+date[2]+' '+date[1]+' '+date[3][2]+date[3][3]}</span>

            </div>
            <img src={props.src} alt=""></img>
        </div>
    </div>
    </>

}
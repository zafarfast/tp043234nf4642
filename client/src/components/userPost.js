import React, { useState } from 'react';
import {FIND_POSTS, FIND_SINGLE_USER, FIND_SINGLE_USER_BY_ID, GET_USER} from '../utils/queries'
import {ADD_FOLLOWER} from '../utils/mutations'
import {gql, useQuery, useMutation} from "@apollo/client";

export default function UserPost(props)
{
    console.log('reloaded'+Math.random())
    let createdAtDate = new Date(parseInt(props.createdAt));
    // console.log(createdAtDate)
    let date = createdAtDate.toString()
    date = date.split(' ')
    const {loading:loading1, data:data1} = useQuery(GET_USER)
    
    // const {loading:loading2, data:data2} = useMutation()
    

    // const {loading:loading2, data:data2} = useQuery(FIND_SINGLE_USER_BY_ID,{
    //     variables:
    //     {
    //         email:props.loggedinUser
    //     }
    
    // // const {loading:loading2, data:data2} = useMutation()
    // });


    const [addfollowermutation] = useMutation(ADD_FOLLOWER, {
        refetchQueries: [GET_USER, FIND_POSTS],
        variables: {
          follower: data1?.findUser._id,
          addFollowerId: props.userID
        },
      });
    
    function addFollower()
    {
        // console.log('Add follower pressed')
        // console.log('ID of person who clicked the post '+props.loggedinUser)
        // console.log('ID of person whose post is clicked '+props.id)

        // console.log(data1?.findUser._id)
        addfollowermutation()
    }

    function removeFollower () {

    }
    
return <>
    <div data-id={props.id} id="user-thought-container">
        <div id="user-thought-header">
            <div id="post-profile-pic">
            <img id="user-profile-pic" src={props.userProfilePic} alt=""></img>
            </div>

            <p id="user-thought">{props.thoughtText}</p>
            <div id="post-follow-button">

            {
                props.isFollowed ? 
                (
                    <button onClick={removeFollower} id="follow-button">Unfollow </button>
                ) : (
                    <button onClick={addFollower} id="follow-button">Follow </button>
                )
            }
            {/* <button  id="follow-button">Follow </button> */}
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
import React, { useState } from 'react';
import UserPost from './userPost'


export default function Postschain(props) {
    return <>
        <div id="thoughts-chain">
            {
                props.posts?.map((item, index) => {
                    return <UserPost key={index} userID={item.userID} loggedinUser={props.loggedinUser} createdAt={item.createdAt} id={item._id} src={item.imageUrl} firstName={item.firstName} thoughtText={item.thoughtText} userProfilePic={item.displayPicture} isFollowed={item.isFollowed} />
                })
            }
        </div>
</>

}
import React, { useState } from 'react';
import UserPost from './userPost'


export default function Postschain(props) {
    return <>
        <div id="thoughts-chain">
            {
                props.posts?.map((item, index) => {
                    return <UserPost key={index} id={item._id} src={item.imageUrl} thoughtText={item.thoughtText} userProfilePic={item.displayPicture} />
                })
            }
        </div>
</>

}
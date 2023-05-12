import React, {useState} from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {GET_USER, QUERY_USERS} from "../utils/queries";

import {Link} from "react-router-dom";
import UserPost from "./userPost";
import Postschain from "./postsChain";

import { Buffer } from "buffer";

export default function UserHome() {
  const token = localStorage.getItem("id_token");

  if (!token) {
    // useNavigate("/login");
    window.location.href = "/login";
  }

  const decoded_token = jwt_decode(token);
  const user = decoded_token.data.email;

  const RENDER_THOUGHT = gql`
    mutation Mutation($thoughtText: String!) {
      getUserThought(thoughtText: $thoughtText)
    }
  `;

  const POST_THOUGHT = gql`
    mutation Mutation(
      $username: String!
      $thoughtText: String!
      $imageUrl: String!
    ) {
      addPost(
        username: $username
        thoughtText: $thoughtText
        imageUrl: $imageUrl
      ) {
        username
        thoughtText
        imageUrl
      }
    }
  `;
  const [previewText, setpreviewText] = useState("");
  const [tutu, settutu] = useState(Math.floor(Math.random() * 10));
  const [formData, setFormData] = useState({
    thought: "",
  });
  const [postData, setpostData] = useState({
    username: "",
    thoughtText: "",
    imageUrl: "",
  });
  const [generatedImageContainer, setgeneratedImageContainer] =
    useState("display-none");
  const [render] = useMutation(RENDER_THOUGHT, {
    variables: {
      thoughtText: formData.thought,
    },
  });
  const [submitPost] = useMutation(POST_THOUGHT, {
    variables: {
      username: user,
      thoughtText: "Default thought text",
      imageUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fbe%2Fce%2F0c%2Fbece0c797cb134aefb2cb836578c9249.gif&f=1&nofb=1&ipt=4ccc34333fe26eae9a014c878fa2c94a57a2c15bf377b7286897aea8e3ad4892&ipo=images",
    },
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData?.thought);
  }

  const [renderImageResponse, setrenderImageResponse] = useState({
    data: {getUserThought: "./images/travelling the world alone.jpg"},
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const url = "./images/loading2.gif";
    setpreviewText(formData.thought);

    setgeneratedImageContainer("display-yes");
    setrenderImageResponse({data: {getUserThought: url}});
    const getImageFromServer = await render({
      variables: {
        thoughtText: formData.thought,
      },
    });
    setrenderImageResponse(getImageFromServer);
    setpostData({
      username: user,
      thoughtText: formData.thought,
      imageUrl: getImageFromServer.data.getUserThought,
    });

    console.log(renderImageResponse.data.getUserThought);
  }

  async function handlePost(event) {
    event.preventDefault();
    console.log("Handle Submit received");
    console.log(postData);
    await submitPost({
      variables: {
        username: postData.username,
        thoughtText: postData.thoughtText,
        imageUrl: postData.imageUrl,
      },
    });
    settutu(Math.floor(Math.random() * 10));
    window.location.reload('#/userHome')
  }

  // const userEmail = localStorage.getItem("userEmail")
  const userEmail = decoded_token.data.email;

  const QUERY_USER = GET_USER;

  let {loading: loading1, error: error1, data: data1} = useQuery(QUERY_USER);
  let findUser = data1?.findUser || [];

  let {loading: loading2, error: error2, data: data2} = useQuery(QUERY_USERS);
  let findUsers = data2?.findUsers || [];

  let posts = [];
  if (findUsers != null) {
    for (let i = findUsers.length - 1; i >= 0; i--) {
      if (findUsers[i].posts) {
        for (let j = findUsers[i].posts.length - 1; j >= 0; j--) {
          posts.push({
            ...findUsers[i].posts[j],
            displayPicture: findUsers[i].displayPicture,
            _id:findUsers[i]._id
          });
        }
      }
    }
  }

  const [display, setdisplay]=useState('display-none')
  function displayObject()
  {
      setdisplay('display-yes')
  }
  function hideObject()
  {
  setdisplay('display-none')
  }

  // function convertBufferToImg (buffer) {
  //   if(buffer) {
  //     console.log(buffer)
  //     var buf = Buffer.from(buffer, 'base64');
  //     console.log(buf)

  //     // const base64String = btoa(String.fromCharCode(...new Uint8Array(buf)));
  
  //     // console.log(base64String)

  //     const blob = new Blob([buf],{
  //       type: 'image/png'
  //     })
  //     console.log(blob)

  //     const srcBlob = URL.createObjectURL(blob);
    
  //     // return `data:image/png;base64,${base64String}`
  //     return srcBlob;
  //   }
  //   else {
  //     return null;
  //   }

  // }


  return (
    <>
      <header>
        <div id="title-div-user-home">
          <img id="logo-main-page" src="./images/logo.svg" alt=""></img>
          <h1 id="thoughtbook-title-text-login-page">ThoughtBook </h1>
        </div>

        <div id="user-profile-pic-div">
        <span className={display} id="user-greeting">Edit Account</span>
          <Link to="/userProfile">
            {" "}
            <img onMouseEnter={displayObject} onMouseLeave={hideObject}
              id="user-profile-pic"
              src={findUser?.displayPicture}
              alt=""
            ></img>
          </Link>
        </div>
      </header>

      <div id="search-form-container">
        <form id="search-form" onSubmit={handleSubmit}>
          <input
            name="thought"
            value={formData.thought}
            onChange={handleChange}
            id="search-field"
            placeholder="Tell us what you are thinking today."
            type="text"
          ></input>
          <button id="search-button">Render </button>
        </form>
      </div>

      <div className={generatedImageContainer}>
        <div id="generated-image-container">
          <p id="user-thought-title-preview">New Post Preview</p>

          <p id="user-thought-preview2">{previewText}</p>

          <div id="generated-image">
            <img src={renderImageResponse.data.getUserThought} alt=""></img>
            <br></br>
          </div>
          <div>
            <button onClick={handlePost} id="post-button">
              Post{" "}
            </button>
            <button onClick={handleSubmit} id="re-generate-button">
              Generate New Image{" "}
            </button>
          </div>
        </div>
      </div>
      <Postschain key={tutu} posts={posts} />
      {/* <div id="thoughts-chain">
            {
                posts?.map((item, index) => {
                    return <UserPost key={index} src={item.imageUrl} thoughtText={item.thoughtText} userProfilePic={item.displayPicture} />
                })
            }
        </div> */}
    </>
  );
}

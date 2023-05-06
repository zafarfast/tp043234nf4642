const db = require('../connection')
const User = require('../models/User')
const Post = require('../models/Post')

async function addPost()
{
  await User.collection.drop()
  await Post.collection.drop()
  const newUser = new User({ email: `zafar@hotmail.com`, firstName:"Zafar", lastName:"Ahmed", password:"thisispassword", displayPicture:"./images/user-profile-pic.jpg", posts:[], followed:[], followers:[]});
  await newUser.save();
  const newUser2 = new User({ email: `bryan@hotmail.com`, firstName:"Bryan", lastName:"Afzal", password:"thisispassword", displayPicture:"./images/user-profile-pic.jpg", posts:[], followed:[], followers:[]});
  await newUser2.save();
  const newUser3 = new User({ email: `anna@hotmail.com`, firstName:"Anna", lastName:"Marcus", password:"thisispassword", displayPicture:"./images/user-profile-pic.jpg", posts:[], followed:[], followers:[]});
  await newUser3.save();
  const newPost = new Post({ username: "zafar@hotmail.com", thoughtText: "Enjoying serenity at lake side",imageUrl: "./images/hut at the lake side.jpg" ,likes:[],comments:[]});
  await newPost.save();
  const newPost2 = new Post({ username: "bryan@hotmail.com", thoughtText: "Travelling the world alone",imageUrl: "./images/travelling the world alone.jpg" ,likes:[],comments:[]});
  await newPost2.save();
  const newPost3 = new Post({ username: "anna@hotmail.com", thoughtText: "Drinking coffee on mars",imageUrl: "./images/drinking coffee on mars.jpg" ,likes:[],comments:[]});
  await newPost3.save();

  newPost.comments.push({
    commentBody:"Beautiful!",
    commentBy:"anna@hotmail.com",
    createdAt: Date.now()
  })
  newPost.save()

  newPost2.comments.push({
    commentBody:"Wonderful, I wish I could do that",
    commentBy:"zafar@hotmail.com",
    createdAt: Date.now()
  })
  newPost2.save()

  const findUser = await User.findOne({email:"zafar@hotmail.com"})
  findUser.posts.push(newPost._id)
  findUser.save()

  const findUser2 = await User.findOne({email:"bryan@hotmail.com"})
  findUser2.posts.push(newPost2._id)
  findUser2.save()

  const findUser3= await User.findOne({email:"anna@hotmail.com"})
  findUser3.posts.push(newPost3._id)
  findUser3.save()


}

module.exports = addPost
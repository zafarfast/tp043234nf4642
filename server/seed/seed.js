const db = require('../connection')
const User = require('../models/User')
const Post = require('../models/Post')

async function addPost()
{
  await User.collection.drop()
  await Post.collection.drop()
  const newUser = new User({ email: `zafar@hotmail.com`, firstName:"Zafar", lastName:"Ahmed", password:"thisispassword", displayPicture:"./images/avatars/avatar1.jpg", posts:[], followed:[], followers:[]});
  await newUser.save();
  const newUser2 = new User({ email: `bryan@hotmail.com`, firstName:"Bryan", lastName:"Afzal", password:"thisispassword", displayPicture:"https://th.bing.com/th/id/R.4b1ebbdf9a6a42f23de2678c80eb02df?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0", posts:[], followed:[], followers:[]});
  await newUser2.save();
  const newUser3 = new User({ email: `anna@hotmail.com`, firstName:"Anna", lastName:"Marcus", password:"thisispassword", displayPicture:"https://th.bing.com/th/id/R.5736c0c62fecf9d0e4a05ff53c013d82?rik=qolrV%2bUth%2fOTjA&riu=http%3a%2f%2fghost.skillshub.info%2fcontent%2fimages%2f2017%2f01%2fprofile-girl-square.png&ehk=CvxbBHBPKtwBuWfkEI51uhrqJ%2bWQpqLXil9D4Ne1%2bsQ%3d&risl=&pid=ImgRaw&r=0", posts:[], followed:[], followers:[]});
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
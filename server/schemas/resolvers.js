const {gql} = require("apollo-server-express");
const path = require("path");
const {generate} = require("../openai/openai");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const addPost = require("../seed/seed");
const {signToken, authMiddleware} = require("../utils/auth");

const resolvers = {
  Query: {
    // findUser: async (_, args,) => {
    //   const a = await User.findOne({ email: args.email }).populate({
    //     path: 'posts', populate: {
    //       path: 'comments'
    //     }, select: '-__v'
    //   });
    //   console.log(a)
    //   return a
    // },
    findUser: async (_, args, context) => {
      if (context.user) {
        const a = await User.findOne({_id: context.user._id}).populate({
          path: "posts",
          populate: {
            path: "comments",
          },
          select: "-__v",
        });
        console.log(a);
        return a;
      } else {
        console.log("User is not logged in");
        return null;
      }
    },
    findUsers: async () => {
      console.log("Request received");
      const a = await User.find({}).populate({
        path: "posts",
        populate: {
          path: "comments",
        },
        select: "-__v",
      });
      console.log("Find Users query received");
      return a;
    },
    getfollowers: async (_, args) => {
      const a = await User.findOne({email: args.email}).populate({
        path: "followers",
        select: "-__v",
      });
      console.log(a);
      return a;
    },
    getfollowed: async (_, args) => {
      const a = await User.findOne({email: args.email}).populate({
        path: "followers",
        select: "-__v",
      });
      console.log(a);
      return a;
    },
  },

  Mutation: {
    //create a new user
    addUser: async (parent, args) => {
      return User.create({
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: args.password,
        displayPicture:
          "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
        posts: [],
        followers: [],
        followed: [],
      });
    },

    editUser: async (parent, args, context) => {
      if (context.user) {
        let update = {};

        if (args.password == "") {
          console.log("Not updating password");
          update = {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
          };
        } else {
          update = {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            password: args.password,
            // displayPicture: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
          };
        }

        return User.findOneAndUpdate(
          {
            _id: context.user._id,
          },
          update
        );
      } else {
        return null;
      }

      // email: args.email,
      // firstName: args.firstName,
      // lastName: args.lastName,
      // password: args.password,
      // displayPicture: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
      // posts: [],
      // followers: [],
      // followed: [],
    },

    //delete user from the database
    deleteUser: async (parent, args) => {
      return User.deleteOne({email: args.email});
    },

    addPost: async (parent, args, context) => {
      //create a new post in the database
      console.log("Add post request received");
      console.log(args);
      const newPost = await Post.create({
        username: args.username,
        thoughtText: args.thoughtText,
        imageUrl: args.imageUrl,
      });

      // add the post to User profile
      const findUser = await User.findOne({email: context.user.email});
      console.log(findUser);
      console.log(context.user);

      findUser.posts.push(newPost._id);
      findUser.save();

      return newPost;
    },

    deletePost: async (parent, args) => {
      return Post.deleteOne({_id: args.postId});
    },

    // add comment to the post
    addComment: async (parent, args) => {
      const findPost = await Post.find({username: args.email});
      const newComment = {
        commentBody: args.commentBody,
        commentBy: args.commentBy,
      };
      findPost[0].comments.push(newComment);
      findPost[0].save();

      return findPost[0];
    },

    deleteComment: async (parent, args) => {
      const result = await Post.findOneAndUpdate(
        {_id: args.postId},
        {$pull: {comments: {_id: args.commentId}}},
        {new: true}
      );
      return result;
    },
    getUserThought: async (parent, args) => {
      // console.log("Render imagereceived")
      const link = await generate(args.thoughtText);
      // console.log(args.thoughtText)
      return link;
    },

    // userLogin: async(parent, args) => {
    //   console.log(args)
    //   const isLoginValid = false
    //   const findUser = await User.find({email: args.email})
    //   console.log(findUser[0])
    //   if (findUser[0]?.email ===  args.email && findUser[0]?.password === args.password){
    //     return {
    //       user: findUser[0],
    //       token: signToken({
    //         email:  findUser[0].email,
    //         _id:  findUser[0]._id
    //       })
    //     }
    //   }  else {
    //     return {
    //       user: null,
    //       token: null
    //     }
    //   }
    //   }

    userLogin: async (parent, args) => {
      console.log(args);
      // const isLoginValid = false;
      const findUser = await User.findOne({email: args.email});
      console.log(findUser[0]);
      if (findUser) {
        if (findUser?.password === args.password) {
          return {
            user: findUser,
            token: signToken({
              email: findUser.email,
              _id: findUser._id,
            }),
          };
        }
      }
      return {
        user: null,
        token: null,
      };
    },

    // userLogin: async(parent, args) => {
    //   console.log(args)
    //   const isLoginValid = false
    //   const findUser = await User.find({email: args.username})
    //   console.log(findUser[0])
    //   if (findUser[0] != null)
    //   {
    //     if ((findUser[0].email ===  args.username) && (findUser[0].password === args.password))
    //     { return true } else {return false}
    //   } else return false

    //   }
  },
};

module.exports = resolvers;
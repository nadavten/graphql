import { buildSchema } from "graphql";

import User from './models/user';
import Post from './models/post';

export const schema = buildSchema(`

    type User{
        id:ID!,
        name:String
        posts:[Post]
    }

    type Post{
        id:ID!,
        text:String,
        user:User
    }

    type Query{
        users:[User]
        posts:[Post]
    }

    type Mutation{
        createUser(name:String!):User
        createPost(userID:ID!,text:String!):Post
    }
`);

export const resolvers = {

    users: function () {
        return User.find().populate('posts');
    },
    posts: function () {
        return Post.find().populate('user');
    },

    createUser: function ({ name }) {

        return User.create({
            name: name
        });
    },

    createPost: function ({ userID, text }) {

        return Post.create({
            user: userID,
            text: text
        }).then(post => {

            return User.findById(userID, (err, user: any) => {
                if (err) {
                    throw new Error(err);
                }

                user.posts.push(post);
                user.save();

                return post;
            });
        });
    }
}
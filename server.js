import {ApolloServer, gql} from "apollo-server";
const tweets = [
    {
      id: "1",
      text: "first one!",
      userId: "2",
    },
    {
      id: "2",
      text: "second one",
      userId: "1",
    },
  ];

let users = [
    {
      id: "1",
      firstName: "nico",
      lastName: "las",
    },
    {
      id: "2",
      firstName: "Elon",
      lastName: "Mask",
    },
  ];
  
  

const typeDefs = gql`
    type User{
        id: ID
        firstName: String!
        lastName: String!
        fullName: String!
    }
    type Tweet{ 
        id: ID
        text: String
        author: User
    }
    type Query{
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID): Tweet!
        ping: String!
    }
	type Mutation{
    	postTweet(text: String, userId: ID): Tweet
    }
`;

const resolvers ={
    Mutation:{
        postTweet(root, {text, userId}){
            if(users.find(user=>user.id===userId)===undefined)
                throw new Error('userId isnt exist');
            else {
                const nowTweet={id: tweets.length+1,
                                text: text,
                                userId: userId};
                tweets.push(nowTweet);
                return nowTweet;
            }
        }

    },
    Query:{
        allUsers(){
            console.log("allUser function activate");
            return users;
        },
        allTweets(){
            return tweets;
        },
        tweet(root, {id}){
            return tweets.find((tweet)=>tweet.id===id);
        },
        ping(){
            return "pong";
        }
    },
    User: {
        fullName({firstName, lastName}){
            return `${firstName} ${lastName}`;
        }
    },
    Tweet:{
        author({userId}){
            return users.find((user)=>userId===user.id);
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{console.log(`${url}서버를 열었습니다~`)});


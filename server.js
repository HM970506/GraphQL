import {ApolloServer, gql} from "apollo-server";
const tweets = [
    {
      id: "1",
      text: "first one!",
    },
    {
      id: "2",
      text: "second one",
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
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url})=>{console.log(`${url}서버를 열었습니다~`)});


const { ApolloServer, gql } = require("apollo-server");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (root, data, context) => {
        console.log(context)
        return books;
    }
  },
};

const start = async () => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.skqkk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(process.env.DB_NAME);

  //   send data to database useing context

  const context = {
    db,
  };

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ typeDefs, resolvers,context });   

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const ObjectId = require("mongodb").ObjectId;
// const MongoClient = require("mongodb").MongoClient;
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 9000;

// app.use(bodyParser.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(process.env.PORT || port);

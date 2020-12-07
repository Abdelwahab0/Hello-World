const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  }).then((res) => {
  // eslint-disable-next-line no-console
    console.log(`Server running at ${res.url}`);
  });

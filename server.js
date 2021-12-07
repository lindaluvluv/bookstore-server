const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schemas");
const BookAPI = require("./graphql/book-api/index");
const resolvers = require("./graphql/resolvers/index");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const db = require("./config/connection");
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3001;
async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => ({
      bookAPI: new BookAPI(),
    }),
  });
  db.once("open", async () => {
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer(typeDefs, resolvers);

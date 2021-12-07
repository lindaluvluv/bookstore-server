const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    bookId: ID!
    description: String
    image: String
    link: String
    title: String
    authors: [String]
  }
  type Query {
    books(query: String!): [Book!]!
  }
`;

module.exports = typeDefs;

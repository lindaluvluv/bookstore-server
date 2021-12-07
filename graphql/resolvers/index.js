const resolvers = {
  Query: {
    books: (_, { query }, { dataSources }) => {
      return dataSources.bookAPI.searchBooks(query);
    },
  },
};

module.exports = resolvers;

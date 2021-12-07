const { RESTDataSource } = require("apollo-datasource-rest");

class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://www.googleapis.com/books/v1/volumes";
  }

  async searchBooks(query = "war") {
    if (!query) return [];
    const books = [];
    const res = await this.get(`?q=${query}`);
    const items = res.items;
    items.forEach((item) => {
      books.push({
        bookId: item.id,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks.thumbnail,
        link: item.volumeInfo.infoLink,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
      });
    });
    return books;
  }
}

module.exports = BookAPI;

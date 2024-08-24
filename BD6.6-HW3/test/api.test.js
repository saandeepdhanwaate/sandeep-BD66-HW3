const request = require("supertest");
const http = require("http");
const { app } = require("../index.js");

const {
  getAllBooks,
  getBookById,
} = require("../controllers/index.controller.js");
const { describe } = require("node:test");

jest.mock("../controllers/index.controller.js", () => ({
  ...jest.requireActual("../controllers/index.controller.js"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoint test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 3: Test Retrieve All Books

  it("should return all books with 200 status code", async () => {
    let mockBook = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockBook);
    let result = await request(server).get("/books");
    expect(result.status).toBe(200);
    expect(result.body.books).toEqual(mockBook);
  });

  // Exercise 4: Test Retrieve Book by ID
  it("should return book with id 1 with 200 status code", async () => {
    let mockBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };
    getBookById.mockReturnValue(mockBook);
    let result = await request(server).get("/books/details/1");
    expect(result.status).toBe(200);
    expect(result.body.book).toEqual(mockBook);
  });
});

describe("controll function test", () => {
  it("should return all books within a getAllBooks function", () => {
    let mockBook = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];
    getAllBooks.mockReturnValue(mockBook);
    let result = getAllBooks();
    expect(result).toEqual(mockBook);
  });
});

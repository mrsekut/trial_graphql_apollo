export type Book = {
    id: string;
    title: string;
    author: string;
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
  },
];

export const db = {
  getBooks: () => books,
  addBook: (book: Book) => {
    books.push(book);
  },
};



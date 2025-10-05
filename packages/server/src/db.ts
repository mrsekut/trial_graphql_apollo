export type Book = {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    isFavorite: boolean;
}

export enum BookFilter {
    ALL = 'ALL',
    RECENT = 'RECENT',
    FAVORITE = 'FAVORITE'
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    createdAt: new Date('2024-01-01').toISOString(),
    isFavorite: true,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    createdAt: new Date('2024-01-15').toISOString(),
    isFavorite: false,
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    createdAt: new Date('2024-02-01').toISOString(),
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    createdAt: new Date('2024-02-15').toISOString(),
    isFavorite: false,
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    createdAt: new Date('2024-03-01').toISOString(),
    isFavorite: false,
  },
];

export const db = {
  getBooks: (filter?: BookFilter) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    switch (filter) {
      case BookFilter.RECENT:
        return books
          .filter(book => new Date(book.createdAt) >= oneWeekAgo)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case BookFilter.FAVORITE:
        return books.filter(book => book.isFavorite);
      case BookFilter.ALL:
      default:
        return books;
    }
  },

  addBook: (book: Book) => {
    books.push(book);
  },

  toggleFavorite: (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) {
      book.isFavorite = !book.isFavorite;
      return book;
    }
    return null;
  }
};



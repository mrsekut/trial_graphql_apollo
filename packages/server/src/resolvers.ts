import * as v from 'valibot';
import { BookInputSchema } from "./validation";
import { db } from "./db";
import type { AddBookInput, QueryResolvers, MutationResolvers, BookFilter } from './graphql/types';

export const queryResolvers: QueryResolvers = {
  books: async (_, args) => {
    const filter = args.filter as BookFilter | undefined;
    return db.getBooks(filter as any);
  },
};

export const mutationResolvers: MutationResolvers = {
  addBook: async (_: unknown, { input }: { input: AddBookInput }) => {
    const parsed = v.parse(BookInputSchema, input);

    const newBook = {
      id: crypto.randomUUID(),
      ...parsed,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };

    db.addBook(newBook);

    return newBook;
  },

  toggleFavorite: async (_: unknown, { id }: { id: string }) => {
    const book = db.toggleFavorite(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  },
};
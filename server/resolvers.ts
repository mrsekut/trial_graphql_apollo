import * as v from 'valibot';
import { BookInputSchema } from "./validation";
import { db } from "./db";
import type { AddBookInput } from '../graphql/types';


export const queryResolvers = {
  books: async () => db.getBooks(),
};

export const mutationResolvers = {
  addBook: async (_: unknown, { input }: { input: AddBookInput }) => {
    const parsed = v.parse(BookInputSchema, input);

    const newBook = {
      id: crypto.randomUUID(),
      ...parsed,
    };

    db.addBook(newBook);

    return newBook;
  },
};
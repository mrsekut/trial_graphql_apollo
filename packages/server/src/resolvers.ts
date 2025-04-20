import * as v from 'valibot';
import { BookInputSchema } from "./validation";
import { db } from "./db";
import type { AddBookInput, QueryResolvers, MutationResolvers } from './graphql/types';

export const queryResolvers: QueryResolvers = {
  books: async () => db.getBooks(),
};

export const mutationResolvers: MutationResolvers = {
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
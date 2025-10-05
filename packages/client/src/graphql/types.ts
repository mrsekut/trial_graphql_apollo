export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddBookInput = {
  author: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export enum BookFilter {
  All = 'ALL',
  Favorite = 'FAVORITE',
  Recent = 'RECENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  toggleFavorite: Book;
};


export type MutationAddBookArgs = {
  input: AddBookInput;
};


export type MutationToggleFavoriteArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  books: Array<Book>;
};


export type QueryBooksArgs = {
  filter?: InputMaybe<BookFilter>;
};

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mutationResolvers, queryResolvers } from './resolvers';
import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';


// スキーマを読み込み
const typeDefs = readFileSync(join(__dirname, '..', 'graphql', 'schema.graphql'), 'utf8');

// schema生成
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers,
  },
});

// Honoアプリを作成
const app = new Hono();

const yoga = createYoga({
  graphqlEndpoint: '/',
  fetchAPI: {
    fetch,
    Request,
    ReadableStream,
    Response,
  },
  schema,
});

app.mount('/graphql', yoga);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}/graphql`);
});
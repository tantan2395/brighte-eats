import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './graphql/schema.js';
import dotenv from 'dotenv';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/graphql', createHandler({ schema, rootValue: resolvers }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on http://localhost:3000');
});

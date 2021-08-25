import { ApolloServer } from 'apollo-server-micro';
import { MongoClient } from 'mongodb';
import typeDefs from '../../src/graphql/typeDefs';
import trivial from '../../src/graphql/trivial';
import userQuery from '../../src/graphql/userQuery';
import linkQuery from '../../src/graphql/linkQuery';
import linkMutation from '../../src/graphql/linkMutation';

const querys = {
  ...userQuery,
  ...linkQuery,
};

const resolvers = {
  Query: {
    ...querys,
  },
  Mutation: {
    ...linkMutation,
  },
  ...trivial,
};

const MONGO_DB = process.env.DB_HOST;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    let db;
    try {
      const client = await MongoClient.connect(MONGO_DB);
      db = client.db();
    } catch (error) {
      console.log(`
        ${MONGO_DB}
        Mongo DB Host not found!
        please add DB_HOST environment variable to .env file
  
        exiting...
         
      `);
      process.exit(1);
    }
    return { db, currentUserId: 'testUser001' };
  },
});

const startServer = apolloServer.start();

// eslint-disable-next-line consistent-return
const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/gql',
  })(req, res);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

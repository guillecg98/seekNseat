export const configuration = () => ({
  database: {
    uri: process.env.DATABASE_URL || 'mongodb://localhost/seeknseet',
  },
  eventstore: {
    uri: process.env.KEYSTORE_URI || 'mongodb://localhost/keystore',
    connection: process.env.EVENTSTORE_URL || 'esdb://localhost:2113?tls=false',
    category: process.env.EVENTSTORE_STREAM,
  },
  jwt: {
    secret:
      process.env.NODE_JWT_SECRET || process.env.NX_JWT_SECRET || 'ChangeMe',
    expires:
      process.env.NODE_JWT_EXPIRES || process.env.NX_JWT_EXPIRES || '60d',
  },
});

export default configuration;

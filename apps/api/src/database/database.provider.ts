import { Connection, createConnection } from "mongoose";

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'

export const DatabaseProvider = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async(): Promise<Connection> =>
            await createConnection(process.env.NODE_MONGODB_URI || 'mongodb://localhost:27017/seekandseat', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
    }
]
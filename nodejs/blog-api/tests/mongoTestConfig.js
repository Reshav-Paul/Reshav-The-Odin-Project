const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

module.exports.connect = async () => {
    mongoServer.getUri().then(async (mongoUri) => {
        const mongooseOpts = {
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
            useFindAndModify: false,
            useNewUrlParser: true,
        };

        await mongoose.connect(mongoUri, mongooseOpts);

        mongoose.connection.on('error', (e) => {
            if (e.message.code === 'ETIMEDOUT') {
                console.log(e);
                mongoose.connect(mongoUri, mongooseOpts);
            }
            console.log(e);;
        });

        mongoose.connection.once('open', () => {
            console.log(`MongoDB successfully connected to ${mongoUri}`);
        });
    });
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}
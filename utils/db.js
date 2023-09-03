const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    // Create a new MongoClient
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB server
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch(err => {
        console.error('Error connecting to MongoDB:', err);
      });
  }

  async isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.client.db().collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.client.db().collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = { dbClient };

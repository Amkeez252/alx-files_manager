const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';
    const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    this.client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    } finally {
      this.client.close();
    }
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const usersCollection = db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } finally {
      this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const db = this.client.db();
      const filesCollection = db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } finally {
      this.client.close();
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;

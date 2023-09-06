// utils/db.js

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`);
    this.dbName = DB_DATABASE;
    this.db = null;
  }

  async isAlive() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      return true;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    if (!this.db) await this.isAlive();
    const usersCollection = this.db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    if (!this.db) await this.isAlive();
    const filesCollection = this.db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
export default dbClient;

import dotenv from 'dotenv';
import {ServerApiVersion, MongoClient} from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri,  {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,

  }
});

async function connectMongoDB() {
  try{
    await client.connect();
    await client.db('admin').command({ping: 1});
  }catch(error){
    console.log('MongoDB connection failed', error);
    process.exit(1)
  }finally{
    await client.close();
  }
}

export default connectMongoDB;

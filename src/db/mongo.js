// @ts-nocheck
import {MongoClient} from 'mongodb';
const MONGO_URL="mongodb+srv://manuel:manuel@cluster0.5ye8abp.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(MONGO_URL)

export function start_mongo() {
	console.log('Starting mongo...');
	return client.connect();
}

export async function mongodb() {
	const client = await MongoClient.connect(MONGO_URL, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	});
	return client.db('TodoApp');
  }

export default client.db('TodoApp')

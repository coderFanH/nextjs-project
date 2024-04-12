import mongoose, { connection } from 'mongoose';

const connect = async () => {
  if (!connection.readyState) {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('mongodb connected', process.env.MONGODB_URL);
  }
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
    } else {
      console.log('not connected to mongodb');
    }
  }
};

export const db = {
  connect,
  disconnect,
};

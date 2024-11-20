import fp from 'fastify-plugin';
import mongoose from 'mongoose';

// Fastify plugin to register Mongoose
async function dbConnector(fastify: any) {
  try {
    const dbUri = 'mongodb://localhost:27017/auth'; 
    await mongoose.connect(dbUri);
    fastify.log.info('MongoDB connected');
  } catch (error) {
    fastify.log.error('MongoDB connection failed:', error);
    throw error;
  }
}

export default fp(dbConnector);

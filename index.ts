import Fastify,{FastifyError, FastifyInstance, FastifyRegister, FastifyReply, FastifyRequest} from 'fastify';
import mongoosePlugin from './global/plugins/mongoosePlugin';
import authRoutes from './global/routes/authRoutes';
import { authHook } from './global/hooks/authHook';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = Fastify({
    logger: {
      level: 'info', // Set the log level (e.g., info, debug, error)
      transport: {
        target: 'pino-pretty', // Use pino-pretty for human-readable logs
        options: {
          colorize: true, // Add colors to the logs
        },
      },
    },
});

server.register(fastifyCors, {
  origin: '*',  // Allow all origins. You can specify your Swagger UI's URL like 'http://localhost:3000' if you want to restrict it.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// server.setErrorHandler((error:FastifyError,request:FastifyRequest,reply:FastifyReply)=>{
// })

// server.addHook('preHandler',authHook)

server.register(mongoosePlugin)
server.register(authRoutes,{ prefix: '/auth' })
server.get('*', async (request, reply) => {
  return { message: 'Hello, Fastify with TypeScript!' };
});

const start = async () => {
  try {
    await server.listen({ port: 8000 });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();


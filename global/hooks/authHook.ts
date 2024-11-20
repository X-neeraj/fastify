import {FastifyRequest,FastifyReply} from 'fastify';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends FastifyRequest {
    user?: any;
}
const JWT_SECRET = "your_jwt_secret_key";

export const authHook = async (request: AuthRequest, reply:FastifyReply) => {
    const authHeader = request.headers['authorization'];
  
    if (!authHeader) {
      reply.status(401).send({ error: 'Authorization header is missing' });
      return;
    }
  
    const token = authHeader.replace('Bearer ', ''); 
  
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      request.user = decoded;
    } catch (error) {
      console.error('Invalid token', error);
      reply.status(401).send({ error: 'Invalid token' });
      return;
    }
};

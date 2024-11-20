import { FastifyRequest, FastifyReply } from 'fastify';
import authService from '../services/auth.service';
import { IUser } from '../model/user';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const res = await authService.login(request.body);
    reply.send({ res});
  } catch (error) {
    reply.status(401).send({ error: 'Invalid credentials' });
  }
};

export const register = async (request:FastifyRequest,reply:FastifyReply)=>{
    try{
      const user=request.body as IUser
      const res= await authService.register(user)
      const {resUser,token}=res as any;
      reply.header('Authorization', `Bearer ${token}`);
      reply.status(201).send(resUser);
    }catch(error){
        reply.status(500).send({error: "something went wrong"})
    }
}

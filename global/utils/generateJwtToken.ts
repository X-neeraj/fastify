import jwt from 'jsonwebtoken';


export const generateJwtToken = (mail : string,userId:any): string => {
    return jwt.sign({ _id:userId,mail: mail }, "your_jwt_secret_key", { expiresIn: '6h' });
};
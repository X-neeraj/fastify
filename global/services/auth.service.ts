import userDao from "../dao/userDao";
import { userDTO } from "../dto/userDTO";
import { IUser } from "../model/user";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/generateJwtToken";

class authService{
    async register(body:IUser){
        const userData:any={...body}
        const salt = await bcrypt.genSalt(10);
        userData.password=await bcrypt.hash(userData.password, salt);
        const user = await userDao.createUser(userData);
        const token = await generateJwtToken(user.email, user._id);
        console.log(token)
        const resUser=new userDTO(user)
        return {resUser,token};
    }

    async login(body:any){
        const {email,password}=body
        const user= await userDao.findUserByMail(email);
        if(!user){
            throw new Error("User not found");
        }
        const isValid= await bcrypt.compare(password, user.password);
        if(!isValid){
            throw new Error("Invalid credentials");
        }
        const userInfo = new userDTO(user);
        return {userInfo};
    }
};

export default new authService()

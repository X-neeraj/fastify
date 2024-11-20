import { IUser, User } from "../model/user";

class UserDAO {
    async createUser(userData:IUser){
        const user=new User(userData);
        return await user.save()
    }
    async findUserByMail(email:string){
        return await User.findOne({email}).exec();
    }
}

export default new UserDAO()
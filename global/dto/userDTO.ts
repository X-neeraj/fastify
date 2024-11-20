import { IUser } from "../model/user";

export class userDTO{
    name:string;
    email:string;
    constructor(user:IUser){
        this.name=user.name;
        this.email=user.email;
    }
}
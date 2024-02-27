import { Request, Response, NextFunction } from 'express';
import { validateUser } from '../services/validation';
import { UserServices } from '../services/user';
import { User } from '../types/User';


export async function login(req :Request, res :Response, next :NextFunction) {
    const { email, password } = req.body as {email:string, password:string};
    try {
        validateUser(req.body);
        const user:User = await UserServices.loginUser({email, password});
        
        res.status(200).json({user:{email:user.email, id:user.id}});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}


export async function register(req:Request, res:Response, next:NextFunction){
    const {email, password} = req.body;
    try {
        validateUser(req.body);
       const userId:number = await UserServices.registerUser({email:email, password});
       return res.status(200).json("Sucessfully registered");
    } catch (error:any) {

        return res.status(500).json({message:error.message});
    }
}
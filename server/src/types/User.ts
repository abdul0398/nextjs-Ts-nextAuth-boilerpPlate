import { Express, Router } from "express";

export interface UserInput {
    email:string,
    password:string
}

export interface User{
    id:string,
    email:string,
    hash_password:string,
    salt:string,
    created_at:Date,
    updated_at:Date
}

export interface options {
    host:string,
    database:string,
    user:string,
    password:string
}


export {Express, Router}
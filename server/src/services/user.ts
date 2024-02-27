import mysql from "mysql2/promise";
import { User, UserInput } from "../types/User";
import { dbHandler } from "../database/db";
import { PasswordUtils } from "../utils/password";

class UserServices {
    static async registerUser(user: UserInput):Promise<number> {
        const insertQuery = `INSERT INTO users (email, hash_password, salt) VALUES (?, ?, ?)`;
        const checkQuery =  `SELECT * FROM users WHERE email = ?`;
        try {
            const email = user.email;
            const [existingUsers] = await dbHandler.pool?.query(checkQuery, [
                email
            ]) as [User[], mysql.FieldPacket[]];
            
            if (existingUsers.length > 0) {
                throw new Error("Email already exists.");
            }

            const salt = await PasswordUtils.generateSalt();
            const password = await PasswordUtils.hashPassword(user.password, salt);

            const result = await dbHandler.pool?.query(insertQuery, [
                email,
                password,
                salt
            ]) as [mysql.ResultSetHeader, mysql.FieldPacket[]];

            if (result && result[0] && result[0].insertId) {
                console.log("User created successfully with ID:", result[0].insertId);
                return result[0].insertId;
            } else {
                throw new Error("Insertion failed or no insertId returned.");
            }
        } catch (error:any) {
            throw Error(error.message);
        }
    }

    static async loginUser(user: UserInput): Promise<User> {
        const selectQuery = `SELECT * FROM users WHERE email = ?`;
        try {
            const [existingUsers] = await dbHandler.pool?.query(selectQuery, [
                user.email
            ]) as [User[], mysql.FieldPacket[]];

            if (existingUsers.length === 0) {
                throw new Error("Invalid email or password.");
            }

            const userRow = existingUsers[0];
            const salt = userRow.salt;
            const hashPassword = userRow.hash_password;
            const password = user.password;
            const isPasswordValid = await PasswordUtils.verifyPassword(password, hashPassword, salt);

            if (isPasswordValid) {
                return existingUsers[0];
            } else {
                throw new Error("Invalid email or password.");
            }
        } catch (error:any) {
            throw Error(error.message);
        }
    }
}

export { UserServices };

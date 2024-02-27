import mysql from "mysql2/promise";
import fs from "fs/promises";
import path from "path";
import { options } from "../types/User";

export class dbHandler {
    static pool: mysql.Pool | undefined = undefined;

    static async initialize(): Promise<void> {
        if (!dbHandler.pool) {
            const option: options = {
                host: process.env.DB_HOST as string,
                database: process.env.DB_NAME as string,
                user: process.env.DB_USER as string,
                password: process.env.DB_PASS as string
            };
            dbHandler.pool = mysql.createPool(option);
        }
    }

    static async createTables(): Promise<void> {
        await dbHandler.initialize();

        try {
            const modelPath = path.join(__dirname, "../models");
            const models: string[] = await fs.readdir(modelPath);
            
            for (const model of models) {
                const filePath = path.join(modelPath, model);
                const { [model.replace('.js', '')]: modelContent } = await import(filePath);
                await dbHandler.pool?.query(modelContent);
            }

            console.log('Tables Created Successfully');
        } catch (error) {
            console.error('Error creating tables:', error);
            throw new Error('Failed to create tables');
        }
    }
}

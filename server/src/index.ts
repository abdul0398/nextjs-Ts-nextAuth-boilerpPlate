import "dotenv/config";
import express from 'express';
import { dbHandler } from "./database/db";
import { setupMiddleware } from "./middlewares/express";
import userRouter from './routes/user';


async function startServer() {
    const PORT = process.env.PORT || 8000;
    await dbHandler.createTables();
    const app = express();
    setupMiddleware(app);
    app.use(userRouter);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
startServer();
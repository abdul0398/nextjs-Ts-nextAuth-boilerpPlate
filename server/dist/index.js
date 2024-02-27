"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const express_2 = require("./middlewares/express");
const user_1 = __importDefault(require("./routes/user"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT || 8000;
        yield db_1.dbHandler.createTables();
        const app = (0, express_1.default)();
        (0, express_2.setupMiddleware)(app);
        app.use(user_1.default);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
startServer();

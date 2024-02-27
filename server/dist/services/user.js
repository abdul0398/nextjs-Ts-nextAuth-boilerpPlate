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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const db_1 = require("../database/db");
const password_1 = require("../utils/password");
class UserServices {
    static registerUser(user) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const insertQuery = `INSERT INTO users (email, hash_password, salt) VALUES (?, ?, ?)`;
            const checkQuery = `SELECT * FROM users WHERE email = ?`;
            try {
                const email = user.email;
                const [existingUsers] = yield ((_a = db_1.dbHandler.pool) === null || _a === void 0 ? void 0 : _a.query(checkQuery, [
                    email
                ]));
                if (existingUsers.length > 0) {
                    throw new Error("Email already exists.");
                }
                const salt = yield password_1.PasswordUtils.generateSalt();
                const password = yield password_1.PasswordUtils.hashPassword(user.password, salt);
                const result = yield ((_b = db_1.dbHandler.pool) === null || _b === void 0 ? void 0 : _b.query(insertQuery, [
                    email,
                    password,
                    salt
                ]));
                if (result && result[0] && result[0].insertId) {
                    console.log("User created successfully with ID:", result[0].insertId);
                    return result[0].insertId;
                }
                else {
                    throw new Error("Insertion failed or no insertId returned.");
                }
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
    static loginUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const selectQuery = `SELECT * FROM users WHERE email = ?`;
            try {
                const [existingUsers] = yield ((_a = db_1.dbHandler.pool) === null || _a === void 0 ? void 0 : _a.query(selectQuery, [
                    user.email
                ]));
                if (existingUsers.length === 0) {
                    throw new Error("Invalid email or password.");
                }
                const userRow = existingUsers[0];
                const salt = userRow.salt;
                const hashPassword = userRow.hash_password;
                const password = user.password;
                const isPasswordValid = yield password_1.PasswordUtils.verifyPassword(password, hashPassword, salt);
                if (isPasswordValid) {
                    return existingUsers[0];
                }
                else {
                    throw new Error("Invalid email or password.");
                }
            }
            catch (error) {
                throw Error(error.message);
            }
        });
    }
}
exports.UserServices = UserServices;

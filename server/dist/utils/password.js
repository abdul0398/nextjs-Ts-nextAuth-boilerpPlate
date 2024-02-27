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
exports.PasswordUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
class PasswordUtils {
    static hashPassword(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                crypto_1.default.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const hashedPassword = derivedKey.toString('hex');
                        resolve(hashedPassword);
                    }
                });
            });
        });
    }
    static generateSalt() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                crypto_1.default.randomBytes(16, (err, saltBuffer) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const salt = saltBuffer.toString('hex');
                        resolve(salt);
                    }
                });
            });
        });
    }
    static verifyPassword(password, hashPassword, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                crypto_1.default.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const hashedPassword = derivedKey.toString('hex');
                        if (hashedPassword === hashPassword) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.PasswordUtils = PasswordUtils;

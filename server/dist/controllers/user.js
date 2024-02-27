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
exports.register = exports.login = void 0;
const validation_1 = require("../services/validation");
const user_1 = require("../services/user");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            (0, validation_1.validateUser)(req.body);
            const user = yield user_1.UserServices.loginUser({ email, password });
            res.status(200).json({ user: { email: user.email, id: user.id } });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
exports.login = login;
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            (0, validation_1.validateUser)(req.body);
            const userId = yield user_1.UserServices.registerUser({ email: email, password });
            return res.status(200).json("Sucessfully registered");
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
exports.register = register;

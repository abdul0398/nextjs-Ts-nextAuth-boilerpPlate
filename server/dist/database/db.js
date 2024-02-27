"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.dbHandler = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class dbHandler {
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dbHandler.pool) {
                const option = {
                    host: process.env.DB_HOST,
                    database: process.env.DB_NAME,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS
                };
                dbHandler.pool = promise_1.default.createPool(option);
            }
        });
    }
    static createTables() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield dbHandler.initialize();
            try {
                const modelPath = path_1.default.join(__dirname, "../models");
                const models = yield promises_1.default.readdir(modelPath);
                for (const model of models) {
                    const filePath = path_1.default.join(modelPath, model);
                    const { [model.replace('.js', '')]: modelContent } = yield Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
                    yield ((_a = dbHandler.pool) === null || _a === void 0 ? void 0 : _a.query(modelContent));
                }
                console.log('Tables Created Successfully');
            }
            catch (error) {
                console.error('Error creating tables:', error);
                throw new Error('Failed to create tables');
            }
        });
    }
}
exports.dbHandler = dbHandler;
dbHandler.pool = undefined;

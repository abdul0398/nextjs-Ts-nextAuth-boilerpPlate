"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
function validateUser(body) {
    console.log(body);
    const userSchema = zod_1.z.object({
        email: zod_1.z.string().min(3, { message: "username must be 3 or more characters long" }).max(30, { message: "username must be 30 or less characters long" }),
        password: zod_1.z.string().min(8, { message: "Password must be 8 or more characters long" }).max(30, { message: "Password must be 30 or less characters long" }),
    });
    try {
        return userSchema.parse(body);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationErrors = error.errors.map(err => err.message);
            throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
        }
        else {
            throw new Error(`Validation error`);
        }
    }
}
exports.validateUser = validateUser;
;

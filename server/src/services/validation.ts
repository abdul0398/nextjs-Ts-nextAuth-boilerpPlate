import {z, ZodError} from "zod";


export function validateUser(body:{username:string, password:string}){
    console.log(body);
    const userSchema = z.object({
        email: z.string().min(3, {message:"username must be 3 or more characters long"}).max(30, {message:"username must be 30 or less characters long"}),
        password: z.string().min(8, {message:"Password must be 8 or more characters long"}).max(30, {message:"Password must be 30 or less characters long"}),
    });
    try {
        return userSchema.parse(body);
    } catch (error) {
        if (error instanceof ZodError) {
            const validationErrors = error.errors.map(err => err.message);
            throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
        } else {
            throw new Error(`Validation error`);
        }
    }
};
import crypto from 'crypto';

export class PasswordUtils {
    static async hashPassword(password: string, salt: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    
                    const hashedPassword = derivedKey.toString('hex');
                    resolve(hashedPassword);
                }
            });
        });
    }

    static async generateSalt(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            crypto.randomBytes(16, (err, saltBuffer) => {
                if (err) {
                    reject(err);
                } else {
                    const salt = saltBuffer.toString('hex');
                    resolve(salt);
                }
            });
        });
    }

    static async verifyPassword(password: string, hashPassword: string, salt: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 64, 'sha256', (err, derivedKey) => {
                if (err) {
                    reject(err);
                } else {
                    const hashedPassword = derivedKey.toString('hex');
                    if (hashedPassword === hashPassword) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
        });
    }

}

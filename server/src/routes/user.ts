import express, {Express, Router} from 'express';
import { login, register } from '../controllers/user';
    
const router: Router = express.Router();

router
.post('/api/auth/register', register)
.post('/api/auth/login', login)



export default router;
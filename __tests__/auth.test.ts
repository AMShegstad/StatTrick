import request from 'supertest';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticationToken from '../server/src/middleware/auth';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/api/test', authenticationToken, (req: Request, res: Response) => {
  console.log("GET /api/test");
  console.log(req.method);
  console.log(req.url);
  res.json({ message: 'JWT is working correctly', user: (req as any).user });
});

describe('JWT Authentication Middleware', () => {
  let token: string;

  beforeAll(() => {
    // Generate a test JWT
    const payload = { id: 1, username: 'testuser' };
    token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/api/test');
    expect(response.status).toBe(401);
  });

  it('should return 403 if an invalid token is provided', async () => {
    const response = await request(app)
      .get('/api/test')
      .set('Authorization', 'Bearer invalidtoken');
    expect(response.status).toBe(403);
  });

  it('should return 200 and the user payload if a valid token is provided', async () => {
    const response = await request(app)
      .get('/api/test')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'JWT is working correctly');
    expect(response.body.user).toHaveProperty('id', 1);
    expect(response.body.user).toHaveProperty('username', 'testuser');
  });
});
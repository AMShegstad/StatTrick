// filepath: /C:/Users/Alex's Lenovo/bootcamp/StatTrick_v6/StatTrick/server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticationToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || '';
  const secretKey = process.env.JWT_SECRET_KEY || '';

  if (!token) {
    res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err || !user) {
      res.sendStatus(403); // Forbidden
    }

    (req as any).user = user;
    next();
  });
};

export default authenticationToken;
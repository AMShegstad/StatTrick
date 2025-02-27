import type { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: JwtPayload;
}
import jwt from 'jsonwebtoken';
// import { User as UserModel } from '../models/user'; 

interface JwtPayload {
  req: CustomRequest,
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      (req as CustomRequest).user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// // Importing specific types and functions from the 'jwt-decode' library.
// // JwtPayload: A type definition representing the structure of a JSON Web Token payload.
// // jwtDecode: A function used to decode a JSON Web Token (JWT) and extract its payload.
// import { type JwtPayload, jwtDecode } from 'jwt-decode';
// import type { UserData } from '../models/user';

// class AuthService {
//   getProfile() {
//     // Decode the JSON Web Token (JWT) using the jwtDecode function, specifying the expected payload type as UserData.
//     // The getToken() method is called to retrieve the JWT, which is then passed to jwtDecode to extract and return its payload.
//     return jwtDecode<UserData>(this.getToken());
//     return false;
//     // If the token is not expired, return false indicating that it is not expired.
//   }
  
//   loggedIn() {
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }
  
//   isTokenExpired(token: string) {
//     try {
//       // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
//       const decoded = jwtDecode<JwtPayload>(token);
      
//       // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
//       if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
//         // If the token is expired, return true indicating that it is expired.
//         return true;
//       }
//     } catch (err) {
//       // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
//       console.error('Error: ', err);
//       return false;
//     }
//   }

//   getToken(): string {
//     const loggedUser = localStorage.getItem('id_token') || '';
//     return loggedUser;
//   }

//   login(idToken: string) {
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     localStorage.removeItem('id_token');
//     window.location.assign('/');
//   }
// }

// export default new AuthService();


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

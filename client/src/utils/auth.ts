
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import UserData from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}
export default new AuthService();

/*

class Auth {
  static login(token: string) {
    localStorage.setItem('token', token);
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!Auth.getToken();
  }
}

export default Auth;
*/
import { JwtPayload, jwtDecode } from 'jwt-decode'; // Using jwt-decode
import UserData from '../../../server/interfaces/UserData'; // Your user interface

class AuthService {
  // Get the user's profile from the token
  getProfile(): UserData | null {
    try {
      const token = this.getToken();
      if (!token) return null; // If no token, return null
      return jwtDecode<UserData>(token); // Decode token into user data
    } catch (err) {
      console.error('Error decoding token:', err);
      return null; // Return null if there's an error decoding the token
    }
  }

  // Check if user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token); // Decode the token
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) { // Expired check
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error checking token expiration:', err);
      return true; // Return true if token is invalid
    }
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('id_token'); // Return token, null if not present
  }

  // Save token to localStorage and reload the page
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken); // Save token to localStorage
    window.location.href='/'; // Reload the page to update UI and auth state
  }

  // Remove token from localStorage and reload the page
  logout(): void {
    localStorage.removeItem('id_token'); // Remove token from localStorage
    window.location.href='/'; // Reload the page to update UI and clear auth state
  }

  // Automatically check if the user is authenticated on page load
  checkAuthOnPageLoad(): void {
    if (this.loggedIn()) {
      console.log('User is logged in');
    } else {
      console.log('User is not logged in');
    }
  }
}

export default new AuthService();

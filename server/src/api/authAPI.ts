import type { UserLogin } from '../models/user';
import Auth from '../services/authService';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json() as { token: string; username: string; favoriteTeam: string };

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    Auth.login(data.token);

    return { username: data.username, favoriteTeam: data.favoriteTeam };
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };

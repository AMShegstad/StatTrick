import { UserLogin } from '../../../server/interfaces/UserLogin';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Ensure the token is returned
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };
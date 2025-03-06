import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate
import AuthService from '../utils/auth';  // Import the AuthService

interface LoginPageProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginSuccess: () => void;
  onShowRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onShowRegister }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);  // Manage error state
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();  // Get response data
      if (data && data.token) {
        // Use AuthService to store the token and navigate
        AuthService.login(data.token);
        onLoginSuccess(); // Trigger login success callback
        navigate('/');  // Redirect to home after login
      } else {
        throw new Error('Failed to retrieve token');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password');  // Set error message
    }
  };

  const onShowRegisterHandler = () => {
    navigate('/register');  // Navigate to the register page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Typography color="error">{error}</Typography>}  {/* Display error */}
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            value={loginData.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={loginData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Box>
        <Button onClick={onShowRegisterHandler} sx={{ mt: 2 }}>
          Don't have an account? Register here!
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;

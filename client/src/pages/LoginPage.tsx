import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from "@mui/material";
import { login } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate
import Auth from '../utils/auth';

interface LoginPageProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginSuccess: () => void;
  onShowRegister: () => void; // onShowRegister is passed as a prop
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onShowRegister }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();  // Use useNavigate hook to handle navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      if (data && data.token) {
        Auth.login(data.token);
        onLoginSuccess();
        navigate('/'); // Navigate to the home page after login
      } else {
        throw new Error('Failed to retrieve token');
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  const onShowRegisterHandler = () => {
    navigate('/register');  // Navigate to the register page
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
          <TextField label="Username" name="username" fullWidth value={loginData.username} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth value={loginData.password} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Box>
        <Button onClick={onShowRegisterHandler} sx={{ mt: 2 }}>
          Don't have an account? Register
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Box } from "@mui/material";
import { login } from '../../../server/dist/api/authAPI.js';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userInfo = { username: email, password };
      const { username, favoriteTeam } = await login(userInfo);
      // Save the username and favorite team to local storage or state
      localStorage.setItem('username', username);
      localStorage.setItem('favoriteTeam', favoriteTeam);
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Container, TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import teams from '../data/teams'; // Import the list of teams

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', favoriteTeam: '' });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting registration form with data:', formData);
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      console.log('Server response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        onRegisterSuccess();
        navigate('/login'); // Redirect to the login page after successful registration
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        throw new Error('Registration failed');
      }
    } catch (err) {
      console.error('Failed to register:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
          <TextField label="Username" name="username" fullWidth value={formData.username} onChange={handleChange} />
          <TextField label="Email" name="email" type="email" fullWidth value={formData.email} onChange={handleChange} />
          <TextField label="Password" name="password" type="password" fullWidth value={formData.password} onChange={handleChange} />
          <FormControl fullWidth>
            <InputLabel id="favorite-team-label">Favorite Team</InputLabel>
            <Select
              labelId="favorite-team-label"
              name="favoriteTeam"
              value={formData.favoriteTeam}
              onChange={handleChange}
              label="Favorite Team"
            >
              {teams.map((team) => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">Register</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { Container, TextField, Button, Paper, Typography, Box, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', favoriteTeam: '' });
  const [teams, setTeams] = useState<{ id: number; team_name: string }[]>([]); // state to store teams
  const navigate = useNavigate();

  // Fetch teams from the API when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
  const response = await fetch('/api/teams', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
        if (response.ok) {
          const data = await response.json();
          setTeams(data); // Update state with teams from the database
        } else {
          console.error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);  // Run once when the component mounts

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting registration form with data:', formData);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

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
              {/* Populate dropdown with teams from the database */}
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.team_name}>
                  {team.team_name}
                </MenuItem>
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

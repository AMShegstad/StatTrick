import { Container, TextField, Button, Paper, Typography, Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" color="primary">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

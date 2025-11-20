import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful!');
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">Sign Up</Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}
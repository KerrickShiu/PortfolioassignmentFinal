import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

export default function Education() {
  const [formData, setFormData] = useState({
    fullName: '',
    degree: '',
    institution: '',
    year: '',
    field: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Qualification submitted successfully!');
        setFormData({ fullName: '', degree: '', institution: '', year: '', field: '' });
      } else {
        setMessage(data.error || 'Submission failed.');
      }
    } catch {
      setMessage('Server error.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>My Education</Typography>
      <ul>
        <li>Sir John A. Macdonald CI — OSSD (2022)</li>
        <li>Centennial College — Health Informatics Technology Advanced Diploma (2025–Present)</li>
      </ul>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Submit Your Qualifications</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Degree or Certification" name="degree" value={formData.degree} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Institution" name="institution" value={formData.institution} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Year of Completion" name="year" value={formData.year} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Field of Study" name="field" value={formData.field} onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Container>
  );
}
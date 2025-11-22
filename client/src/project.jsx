import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, List, ListItem } from '@mui/material';

export default function Project() {
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setUserProjects(data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setUserProjects([...userProjects, data]);
        setFormData({ title: '', description: '', link: '' });
      } else {
        console.error('Error creating project:', data.error);
      }
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Submit Your Project</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Project Title" name="title" value={formData.title} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Description" name="description" value={formData.description} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Link to your project" name="link" value={formData.link} onChange={handleChange} />
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>

      {userProjects.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>User Submitted Projects</Typography>
          <List>
            {userProjects.map((proj) => (
              <ListItem key={proj._id}>
                <div>
                  <Typography variant="subtitle1">{proj.title}</Typography>
                  <Typography>{proj.description}</Typography>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>}
                </div>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}
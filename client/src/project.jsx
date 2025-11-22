import React, { useState } from 'react';
import game from './bugsmashergame.png';
import visualization from './healthdatavisualization.png';
import app from './stackimplementationapp.png';
import { TextField, Button, Typography, Container, List, ListItem } from '@mui/material';

export default function Project() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });
  const [userProjects, setUserProjects] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProjects([...userProjects, formData]);
    setFormData({ title: '', description: '', link: '' });
  };

  return (
    <Container>
      <h2>My Projects</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              Quick Bug Smasher Game using html, css, javascript.
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <img src={game} alt="Bugsmasher game" width="540px"/>
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              Data Visualization project using Tableau Digital with a Healthcare Dataset
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <img src={visualization} alt="Data Visualization" width="540px" />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              Stack Implementation App created using C#, OOP Principles and Winforms via Microsoft Visual Studio
            </td>
            <td style={{ border: "1px solid #000", padding: "8px" }}>
              <img src={app} alt="Stack Implementation App" width="368px" />
            </td>
          </tr>
        </tbody>
      </table>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Submit Your Project</Typography>
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
            {userProjects.map((proj, idx) => (
              <ListItem key={idx}>
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
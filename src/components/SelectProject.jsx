import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function SelectProject({ onSelectProject }) {
  const [selectedProject, setSelectedProject] = React.useState('');
  const [projects, setProjects] = useState([]);

  const handleChange = (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    onSelectProject(projectId);
  };


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://bookinghomestayswp.azurewebsites.net/api/project/customer/viewproject');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ width: 145, mb: "35px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Project</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProject}
          label="Select Project"
          onChange={handleChange}
        >
          <MenuItem value="">All product</MenuItem>
          {projects.map((project) => (
            <MenuItem key={project.projectID} value={project.projectID}>
              {project.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

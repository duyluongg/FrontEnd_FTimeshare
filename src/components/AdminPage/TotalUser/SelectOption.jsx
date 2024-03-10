import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOption({ row, onRole }) {
    // const [selectedRole, setSelectedRole] = useState(row.status);

    // const handleRoleChange = (event) => {
    //     const newRole = event.target.value;
    //     onRole(row, newRole);
    //     setSelectedRole(newRole); 
    // };

    const [selectedRole, setSelectedRole] = useState(row.status);

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        onRole(row, newRole);
        setSelectedRole(newRole);
    };

    return (
        <FormControl sx={{ width: "100px" }}>
            <InputLabel id="demo-simple-select-label">{selectedRole}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRole}
                label="Age"
                onChange={handleRoleChange}
            >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="block">Block</MenuItem>
            </Select>
        </FormControl>
    );
}

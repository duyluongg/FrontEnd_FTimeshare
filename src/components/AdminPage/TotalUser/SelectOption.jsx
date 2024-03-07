import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOption({ row, onRole }) {
    const [selectedRole, setSelectedRole] = useState(row.status);

    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        onRole(row, newRole);
        setSelectedRole(newRole); // Cập nhật giá trị mới
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`role-label-${row.id}`}>{selectedRole}</InputLabel>
                <Select
                    labelId={`role-label-${row.id}`}
                    id={`role-select-${row.id}`}
                    value={selectedRole}
                    onChange={handleRoleChange}
                    label="Role"
                >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="block">Block</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

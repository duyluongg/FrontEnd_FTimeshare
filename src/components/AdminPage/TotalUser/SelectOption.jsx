import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOption({ row, onRole }) {
    console.log(row);
    const handleRoleChange = (event) => {
        const newRole = event.target.value;
        onRole(row, newRole);
    };
    const status = row.status === 'active' || row.accStatus === 'block' ? row.accStatus : '';
console.log(status);
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`role-label-${row.id}`}>{status}</InputLabel>
                <Select
                    labelId={`role-label-${row.id}`}
                    id={`role-select-${row.id}`}
                    value={status} // Hiển thị trạng thái tài khoản hiện tại
                    onChange={handleRoleChange}
                    label="Role"
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Block">Block</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}


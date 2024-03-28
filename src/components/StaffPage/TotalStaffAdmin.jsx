import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalPopUp from '../AdminPage/TotalUser/ModalPopUp.jsx';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import StaffNavbar from './StaffNavbar.jsx';
import SelectOption from '../AdminPage/TotalUser/SelectOption.jsx';

export default function TotalStaffAdmin() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');

  console.log(search);

  useEffect(() => {
    const fetchRow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/ROLE_STAFF');
        const updatedRows = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
          status: row.accStatus === 'active' ? 'Active' : 'Block' // Cập nhật trạng thái
        }));
        setRows(updatedRows);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };
  
    fetchRow();
  }, []);

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${row.accID}`);
      setRows((prevRows) => prevRows.filter((prevRow) => prevRow.id !== row.id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleRole = async (row, newRole) => {
    try {
      let response;
      if (newRole === 'active') {
        response = await axios.put(`http://localhost:8080/api/users/staff/active/${row.accID}`);
      } else if (newRole === 'block') {
        response = await axios.put(`http://localhost:8080/api/users/staff/block/${row.accID}`);
      }

      console.log(response.data);


    } catch (error) {
      console.error('Error updating role:', error);
    }
  };




  return (
    <div>
    
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <TextField sx={{ width: '500px', mb: '35px', mt:"20px" }}
          placeholder="Search..."
          variant="outlined"
          size="small"
          defaultValue=""
          onChange={(s) => setSearch(s.target.value)}
   

        />
        <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
          <SearchIcon />
        </IconButton>
      </div>
      <DataGrid
        // rows={rows.filter((item) => search.toLocaleLowerCase() === '' ? item : item.accName.toLocaleLowerCase().includes(search)}
        rows={rows.filter((item) =>
          search.trim() === '' ? true : item.accName.toLowerCase().includes(search.toLowerCase())
        )}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'accName', headerName: 'Name', width: 130 },
          { field: 'accPhone', headerName: 'Phone', width: 130 },
          { field: 'accEmail', headerName: 'Email', width: 200 },
          {
            field: 'delete',
            headerName: 'Action',
            width: 100,
            renderCell: (params) => (
              <ModalPopUp onDelete={handleDelete} row={params.row} color='error' />
            ),
          },
          {
            field: 'role',
            headerName: 'Role',
            width: 200,
            renderCell: (params) => (
              <SelectOption onRole={handleRole} row={params.row} />
            ),
          },
        ]}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        rowHeight={80}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalPopUp from '../TotalUser/ModalPopUp.jsx';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
export default function TotalStaff() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchRow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/ROLE_STAFF');
        const rowsWithId = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
        console.log(rows);
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <TextField sx={{ width: '500px', mb: '35px' }}
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
            width: 30,
            renderCell: (params) => (
              <button onClick={() => handleDelete(params.row)}><ModalPopUp color='error' /></button>
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
        checkboxSelection
      />
    </div>
  );
}

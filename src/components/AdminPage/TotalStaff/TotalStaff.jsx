import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalPopUp from '../TotalUser/ModalPopUp.jsx';

export default function TotalStaff() {
  const [rows, setRows] = useState([]);

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
      <DataGrid
        rows={rows}
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
           <button onClick={() => handleDelete(params.row)}><ModalPopUp color='error'/></button>
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

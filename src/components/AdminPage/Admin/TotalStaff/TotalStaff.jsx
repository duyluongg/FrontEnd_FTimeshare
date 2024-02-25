import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'accName', headerName: 'Name', width: 130 },
  { field: 'accPhone', headerName: 'Phone', width: 130 },
  { field: 'accEmail', headerName: 'Email', width: 200 },

];

export default function TotalStaff() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/ROLE_STAFF');
        console.log(response);
       
        const rowsWithId = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowsWithId);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchRow();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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

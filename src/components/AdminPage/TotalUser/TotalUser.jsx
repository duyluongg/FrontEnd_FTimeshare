// import React, { useState, useEffect } from 'react'
// import { DataGrid } from '@mui/x-data-grid';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Select } from '@mui/material';
// import ModalPopUp from './ModalPopUp.jsx'
// import axios from 'axios';

// const columns = [
//   { field: 'accID', headerName: 'ID', width: 70 },
//   {
//     field: 'accName',
//     headerName: 'Name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 230,

//   },
//   {
//     field: 'accEmai',
//     headerName: 'Email',
//     width: 230,
//   },
//   {
//     field: 'accPhone',
//     headerName: 'Phone',
//     width: 230,
//   },
//   {
//     field: 'accBirthday',
//     headerName: 'Birthday',
//     width: 230,
//   },
//   {
//     field: 'accStatus',
//     headerName: 'Status',
//     width: 150,
//     renderCell: (params) => (
//       <Select
//       native
//       value={params.row.status || ''} // Thay đổi từ null thành chuỗi rỗng ''
//       onChange={(e) => console.log(e.target.value)}
//     >
//       <option value={'active'}>Active</option>
//       <option value={'inactive'}>Inactive</option>
//     </Select>
//     ),
//   },
//   // {
//   //   field: 'actions',
//   //   headerName: 'Actions',
//   //   width: 150,
//   //   sortable: false,
//   //   renderCell: (params) => (
//   //     <div>
//   //       <IconButton aria-label="delete"  >
//   //         <ModalPopUp />
//   //       </IconButton>
//   //       {/* 
//   //       <IconButton aria-label="ban"  >
//   //        <ModalPopUp/>
//   //       </IconButton> */}
//   //     </div>
//   //   ),
//   // },
// ];



// export default function DataTable() {

//   // const rows = [
//   //   { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'duyluongg1910@gmail.com', age: 35 },
//   //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   // ];
//   const [user, setUser] = useState([])

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const fetchUsers = async () => {
//     try {

//       const response = await axios.get('http://localhost:8080/api/users/customer');

//       setUser(response.data.map(user => ({
//         id: user.accID,
//         fullName: user.accName,
//         email: user.accEmail,
//         phone: user.accPhone,
//         birthday: user.accBirthday,
//         status: user.accStatus
//       })));
//       console.log(response);
//       console.log(setUser(response.data));

//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };










//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={user}  
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />






//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import Pagination from '@mui/material/Pagination';
// // function createData(name, calories, fat, carbs, protein) {
// //   return { name, calories, fat, carbs, protein };
// // }

// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //   createData('Eclair', 262, 16.0, 24, 6.0),
// //   createData('Cupcake', 305, 3.7, 67, 4.3),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// // ];

// export default function BasicTable() {
//   const [user, setUser] = useState([])

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const fetchUsers = async () => {
//     try {

//       const response = await axios.get('http://localhost:8080/api/users/ROLE_CUSTOMER');

//       setUser(response.data)
//       console.log(response);


//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };
//   return (
//     <>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

//         <TextField sx={{ width: '500px', mb: '35px' }}
//           placeholder="Search..."
//           variant="outlined"
//           size="small"
//           defaultValue=""
//         // onChange={handleSearch}
//         />
//         <IconButton type="submit" aria-label="search" sx={{ mb: '30px' }}>
//           <SearchIcon />
//         </IconButton>
//       </div>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>No</TableCell>
//               <TableCell align="left">Fullname</TableCell>
//               <TableCell align="left">Phone</TableCell>
//               <TableCell align="left">Email</TableCell>
//               <TableCell align="left">Birthday</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {user.map((row, index) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell align="left">{row.accName}</TableCell>
//                 <TableCell align="left">{row.accPhone}</TableCell>
//                 <TableCell align="left">{row.accEmail}</TableCell>
//                 <TableCell align="left">{row.accBirthday}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Pagination count={10} color="primary" sx={{display: 'flex', alignItems:'center', justifyContent: 'center', mt:'25px'}} />

//     </>


//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModalPopUp from './ModalPopUp.jsx'



// export default function TotalStaff() {
//   const [rows, setRows] = useState([]);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'accName', headerName: 'Name', width: 130 },
//     { field: 'accPhone', headerName: 'Phone', width: 130 },
//     { field: 'accEmail', headerName: 'Email', width: 200 },
//     {
//       field: 'delete',
//       headerName: 'Action',
//       width: 30,
//       renderCell: (params) => (
//         // <button onClick={() => handleDelete(params.row)}><ModalPopUp color='error'/></button>
//         <button><ModalPopUp color='error'/></button>

//       ),
//     },
//   ];

//   useEffect(() => {
//     const fetchRow = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/users/ROLE_CUSTOMER');
//         const rowsWithId = response.data.map((row, index) => ({ ...row, id: index + 1 }));
//         setRows(rowsWithId);
//         console.log(rows);
//       } catch (error) {
//         console.error('Error fetching staff:', error);
//       }
      
//     };

//     fetchRow();
//   }, []);
//   // const handleDelete = async (row) => {
//   //   try {

//   //     await axios.delete(`http://localhost:8080/api/users/delete/${row.accID}`);

//   //     setRows((prevRows) => prevRows.filter((prevRow) => prevRow.id !== row.id));
     
//   //   } catch (error) {
//   //     console.error('Error deleting row:', error);
//   //   }
//   // };


//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         getRowId={(row) => row.id}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalPopUp from './ModalPopUp.jsx';

export default function TotalStaff() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRow = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/ROLE_CUSTOMER');
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
              <ModalPopUp onDelete={handleDelete} row={params.row} color='error' />
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


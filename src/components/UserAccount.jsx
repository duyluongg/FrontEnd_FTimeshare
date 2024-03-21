import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormUpdateUser from './UpdateUserAccount.jsx';
import ModalPopUp from './AdminPage/TotalUser/ModalPopUp.jsx';
import TextField from '@mui/material/TextField';
import SnackBar from './SnackBar.jsx';
export default function UserAccount() {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarColor, setSnackbarColor] = React.useState('success');

    const [user, setUser] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', phoneNumber: '' });

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const response = await axios.get('https://65f79c2bb4f842e80885bd92.mockapi.io/crud');
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };



    // const handleInputChange = (e) => {
    //     setNewUser({ ...newUser, [e.target.name]: e.target.value });
    //     console.log(e.target.value);
    // };

    // const addUser = async () => {
    //     try {
    //         const response = await axios.post('https://65f43384f54db27bc020d75c.mockapi.io/crud', newUser);
    //         setUser([...user, response.data]);
    //         setNewUser({ name: '', phoneNumber: '' });
    //     } catch (error) {
    //         console.error('Error adding user:', error);
    //     }
    // };

    const addUser = async () => {
        try {
            const response = await axios.post('https://65f79c2bb4f842e80885bd92.mockapi.io/crud', { name, phoneNumber });
            setUser([...user, response.data]);
            setName(''); 
            setPhoneNumber(''); 
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`https://65f79c2bb4f842e80885bd92.mockapi.io/crud/${id}`);
            fetchUser();
            setSnackbarMessage('Delete successfully !!!');
            setSnackbarColor('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting row:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // const schema = Yup.object().shape({
    //     name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    //     phoneNumber: Yup.string().required('phoneNumber is required'),
     
    // })


    return (
        <>
            {/* <div>
                <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={newUser.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone"
                />
                <button onClick={addUser}>Add User</button>
            </div> */}
            <div>
                <TextField
                    type="text"
                    name="name"
                    value={name}
                    // onChange={handleInputChange}
                    onChange={(e) => setName(e.target.value)}

                    placeholder="Enter name"
                    sx={{ml:"80px"}}
                />

                <TextField
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    // onChange={handleInputChange}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone"
                />
                {/* <button onClick={addUser}>Add User</button> */}
                <Button variant="contained" onClick={addUser} sx={{ mt: "10px" }}>Add User</Button>
            </div>
            {user.map((item) => (
                <Card sx={{ maxWidth: 345, mb: "20px", mt: "20px", boxShadow: 3, ml:"80px" }} key={item.id}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.phoneNumber}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <FormUpdateUser getID={item.id} updateUserList={fetchUser} />
                        <ModalPopUp onDelete={() => handleDelete(item.id)} row={item} color='error' />
                    </CardActions>
                </Card>
            ))}
            <SnackBar open={snackbarOpen} message={snackbarMessage} onClose={handleSnackbarClose} color={snackbarColor} />

        </>
    );
}




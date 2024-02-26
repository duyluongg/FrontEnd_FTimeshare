// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import PersonIcon from '@mui/icons-material/Person';
// import AddIcon from '@mui/icons-material/Add';
// import Typography from '@mui/material/Typography';
// import { blue } from '@mui/material/colors';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Link } from 'react-router-dom';

// const option = ['Show report'];

// function SimpleDialog(props) {
//     const { onClose, selectedValue, open, productID } = props;

//     const handleClose = () => {
//         onClose(selectedValue);
//     };

//     const handleListItemClick = (value) => {
//         onClose(value);
//     };

//     const handleClick = () => {
//         console.log('Product ID:', productID);
   
//     };

//     return (
//         <Dialog onClose={handleClose} open={open} fullWidth>
//             <DialogTitle>Select option</DialogTitle>
//             <List sx={{ pt: 0 }}>
//                 {option.map((item) => (
//                     <ListItem disableGutters key={item}>
//                         <ListItemButton component={Link} to="/admin/report-project" onClick={handleClick}>
//                             <ListItemText primary={item} />

//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//                 <ListItem disableGutters />
//             </List>
//         </Dialog>
//     );
// }

// export default function SimpleDialogDemo(props) {
   

//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState(option[1]);

//     const handleClose = (value) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };

//     const handleShowReportClick = () => {
//         setOpen(true);
//     };

//     return (
//         <div>
//             <Button variant="outlined" onClick={handleShowReportClick}>
//                 <MoreVertIcon />
//             </Button>
//             <SimpleDialog
//                 selectedValue={selectedValue}
//                 open={open}
//                 onClose={handleClose}
//                 productID={props.productID} // Pass productID to SimpleDialog
//             />
//         </div>
//     );
// }



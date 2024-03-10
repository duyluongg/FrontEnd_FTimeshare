import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePageAdmin from '../HomepageAdmin/HomePageAdmin';
import Dashboard from '../Dashboard/Dashboard.jsx';
import '../Dashboard/Dashboard.css'
import { blue, pink } from '@mui/material/colors';
import TotalUser from '../TotalUser/TotalUser.jsx';
import TotalProductPending from '../TotalProjectPending/TotalProductPending.jsx'
import RejectedProject from '../RejectedProject/RejectedPrj.jsx';
import ViewReport from '../ViewReport/ViewReport.jsx';
import CardReport from '../ViewReport/CardReport.jsx';
import TotalStaff from '../TotalStaff/TotalStaff.jsx';
import TotalReport from '../TotalReport/TotalReport.jsx';
import TotalViewPendingBooking from '../TotalViewPendingBooking/TotalViewPendingBooking.jsx';
import TotalViewActiveBooking from '../TotalViewActiveBooking/TotalViewActiveBooking.jsx';
import ViewBookingConfirm from '../VIewConfirmBooking/ViewBookingConfirm.jsx';
import ViewCustomerPayment from '../ViewCustomerPayment/ViewCustomerPayment.jsx';
import ViewBookingRC from '../ViewBookingRC/ViewBookingRC.jsx';
import TotalProduct from '../TotalProject/TotalProduct.jsx';
import New from '../New/New.jsx';





const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidenav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const [currentPage, setCurrentPage] = React.useState('');

    React.useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: "#CD9A2B" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        MANAGE SYSTEM
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}  >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 2, p: 3 }}  >
                <DrawerHeader />
                {currentPage === '/admin' && <Dashboard />}
                {/* <Routes>
                    <Route path='/admin/total-users' element={<TotalUser />}></Route>

                </Routes> */}
                {currentPage === '/admin/total-users' && <TotalUser />}
                {currentPage === '/admin/total-product' && <TotalProduct />}
                {currentPage === '/admin/pending-product' && <TotalProductPending />}
                {currentPage === '/admin/rejected-product' && <RejectedProject />}
                {currentPage === '/admin/total-staff' && <TotalStaff />}
                {currentPage === '/admin/total-report' && <TotalReport/>}
                {currentPage === '/admin/pending-list' && <TotalViewPendingBooking/>}
                {currentPage === '/admin/active-list' && <TotalViewActiveBooking/>}
                {currentPage === '/admin/wait-to-confirm-list' && <ViewBookingConfirm/>}
                {currentPage === '/admin/wait-to-confirm-rc' && <ViewBookingRC/>}
                {currentPage === '/admin/wait-customer-to-confirm-payment-list' && <ViewCustomerPayment/>}
                {currentPage === '/admin/new' && <New />}







                {/* {currentPage === '/admin/report-project:productID' && < CardReport />} */}






            </Box>
        </Box>
    );
}

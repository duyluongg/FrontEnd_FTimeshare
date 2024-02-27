import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Review from '../../Review/Review';
import ModalPopUpReport from './ModalPopUpReport';
import { Grid } from '@mui/material';

export default function CardReportV2() {
    const [projectReport, setProjectReport] = useState([]);
    const [reportDetails, setReportDetails] = useState({});

    const { productID } = useParams();
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetchProjectReport();
    }, []);

    const fetchProjectReport = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewByProductId/${productID}`)
            setProjectReport(response.data);
            if (response.data.length > 0) {
                response.data.forEach(item => {
                    fetchProjectReportDetail(item.reportID);
                });
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchProjectReportDetail = async (reportID) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewDetail/${reportID}`)
            setReportDetails(prevState => ({
                ...prevState,
                [reportID]: response.data.accID
            }));
        } catch (error) {
            console.error('Error fetching report details:', error);
        }
    };

    const handleDelete = async (reportID) => {
        try {
            await axios.delete(`http://localhost:8080/api/reports/delete/${reportID}`);
            setDeleted(true);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    return (
        <>
                <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', ml: '50px' }}>

            {!deleted && projectReport.map((item) => (
                    <Card key={item.reportID} sx={{ maxWidth: 345, margin: "20px" }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {reportDetails[item.reportID] && reportDetails[item.reportID].accName}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={reportDetails[item.reportID] && reportDetails[item.reportID].accName}
                            subheader={item.reportCreateDate}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {item.reportDetail}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="194"
                            // image={item.productID && item.productID.projectID.projectPicture}
                            alt="Project Image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.productID && item.productID.productName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ModalPopUpReport onDelete={() => handleDelete(item.reportID)} color='error' />
                            <Button variant="outlined" color='error'>{item.reportStatus}</Button>
                        </CardActions>
                    </Card>


            ))}
                </Grid>

        </>
    )
}

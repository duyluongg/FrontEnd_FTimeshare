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
import "./CardReportV2.css"
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalProfile from './ModalProfile';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardReportV2() {
    const [projectReport, setProjectReport] = useState([]);
    const [reportDetails, setReportDetails] = useState({});

    const { productID } = useParams();
    const [deleted, setDeleted] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        fetchProjectReport();
    }, []);

    const fetchProjectReport = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewByProductId/${productID}`)
            setProjectReport(response.data);
            console.log(projectReport);
            if (response.data.length > 0) {
                response.data.forEach(item => {
                    fetchProjectReportDetail(item.reportID);
                });
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    // const fetchProjectReportDetail = async (reportID) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/reports/viewDetail/${reportID}`)
    //         setReportDetails(prevState => ({
    //             ...prevState,
    //             [reportID]: response.data.accID

    //         }));
    //     } catch (error) {
    //         console.error('Error fetching report details:', error);
    //     }
    // };

    const fetchProjectReportDetail = async (reportID) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewDetail/${reportID}`);
            const { accID, productID } = response.data;
            setReportDetails(prevState => ({
                ...prevState,
                [reportID]: { accID, productID }
            }));
            console.log(reportDetails);
        } catch (error) {
            console.error('Error fetching report details:', error);
        }
    };


    // const handleDelete = async (reportID) => {
    //     try {
    //         await axios.delete(`http://localhost:8080/api/reports/delete/${reportID}`);
    //         setDeleted(true);
    //     } catch (error) {
    //         console.error('Error deleting report:', error);
    //     }
    // };

    const handleDelete = async (reportID) => {
        try {
            await axios.delete(`http://localhost:8080/api/reports/delete/${reportID}`);
            // Sau khi xóa thành công, cập nhật lại danh sách báo cáo bằng cách loại bỏ báo cáo đã xóa
            setProjectReport(prevProjectReport => prevProjectReport.filter(item => item.reportID !== reportID));
            // setProjectReport(true);

        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };
    
    


    return (
        <>

            <div className='flex-report-information'>
                <div>
                    <div className='card-report-information'>
                        { projectReport.length > 0 && (
                            <Card sx={{ maxWidth: 500 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" >
                                            {/* {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.accID.accName[0]} */}
                                            {/* <ModalProfile  accName={reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.accID} /> */}
                                            <ModalProfile accID={reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.accID} />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.accID.accName}



                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image="../../image/prj/prj01.jpg"
                                    alt={reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productName}
                                />
                                <CardContent>
                                    <Typography color={"green"}>
                                        {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productRating}<FontAwesomeIcon icon={faStar} color='#FFD43B' />
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Description: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productDescription} <br />
                                        Convenience: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productConvenience} <br />
                                        Area: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productArea} <br />
                                        Price: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.productPrice}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                {/* <ModalPopUpReport onDelete={() => handleDelete(projectReport[0].reportID)} color='error' /> */}
                                    
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>
                                            Project Name: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.projectID.projectName}
                                        </Typography>
                                        <Typography paragraph>
                                            Desecription:  {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.projectID.projectDescription}
                                        </Typography>
                                        <Typography paragraph>
                                            Build Date:  {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.projectID.projectBuildDate}
                                        </Typography>
                                        <Typography paragraph>
                                            Project Area: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.projectID.projectArea}
                                        </Typography>
                                        <Typography paragraph>
                                            Contractor Name: {reportDetails[projectReport[0].reportID] && reportDetails[projectReport[0].reportID].productID.projectID.contractorID.contractorName}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        )}
                    </div>
                </div>

                <div>
                    <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', ml: 'auto' }}>

                        { !deleted && projectReport.map((item) => (
                            <>

                                <Card key={item.reportID} sx={{ maxWidth: 345, margin: "20px" }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                {reportDetails[item.reportID] && reportDetails[item.reportID].accID.accName}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={reportDetails[item.reportID] && reportDetails[item.reportID].accID.accName}
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
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <ModalPopUpReport onDelete={() => handleDelete(item.reportID)} color='error' />
                                        <Button variant="outlined" color='error'>{item.reportStatus}</Button>
                                    </CardActions>
                                </Card>
                            </>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    )
}

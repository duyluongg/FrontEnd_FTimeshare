// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

// export default function CardReport() {
//     const [projectReport, setProjectReport] = useState([]);
//     const { productID } = useParams();
//     const [expanded, setExpanded] = React.useState(false);

//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     }
//     useEffect(() => {
//         fetchProjectActive();
//     }, []);

//     const fetchProjectActive = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8080/api/products/viewById/${productID}`)
//             console.log(response.data); // Log the response data directly
//             setProjectReport(response.data);
//             // console.log(response);
//         } catch (error) {
//             console.error('Error fetching projects:', error);
//         }
//     };
//     return (
//         projectReport.map((item) => (

//             <Card sx={{ maxWidth: 345 }} key={item.productID}>
//             <CardHeader
//                 avatar={
//                     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                         {item.productName[0]}
//                     </Avatar>
//                 }
//                 action={
//                     <IconButton aria-label="settings">
//                         <MoreVertIcon />
//                     </IconButton>
//                 }
//                 title={item.productName}
//                 subheader="September 14, 2016"
//             />
//             <CardMedia
//                 component="img"
//                 height="194"
//                 image={item.productPicture}
//                 alt="Paella dish"
//             />
//             <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                     {item.productConvenience}
//                 </Typography>
//             </CardContent>
//             <CardActions disableSpacing>
//                 <IconButton aria-label="add to favorites">
//                     <FavoriteIcon />
//                 </IconButton>
//                 <IconButton aria-label="share">
//                     <ShareIcon />
//                 </IconButton>
//                 <ExpandMore
//                     expand={expanded}
//                     onClick={handleExpandClick}
//                     aria-expanded={expanded}
//                     aria-label="show more"
//                 >
//                     <ExpandMoreIcon />
//                 </ExpandMore>
//             </CardActions>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//                 <CardContent>
//                     <Typography paragraph>Method:</Typography>
//                     <Typography paragraph>
//                         {item.productDescription}
//                     </Typography>
//                 </CardContent>
//             </Collapse>
//         </Card>
//         ))


//     )
// }


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

export default function CardReport() {
    const [projectReport, setProjectReport] = useState({});
    const { reportID } = useParams();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        fetchProjectReport();
    }, []);

    const fetchProjectReport = async () => {
        console.log(reportID);
        try {
            const response = await axios.get(`http://localhost:8080/api/reports/viewDetail/${reportID}`)
            console.log(response.data); // Log the response data directly
            setProjectReport(response.data);
            // console.log(response);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDelete = async (reportID) => {
        try {
          await axios.delete(`http://localhost:8080/api/reports/delete/${reportID}`);
        
            
         
        } catch (error) {
          console.error('Error deleting row:', error);
        }
      };

    return (
        <>

            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {projectReport.accID && projectReport.accID.accName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title= {projectReport.productID && projectReport.productID.accID.accName}

                    subheader={projectReport.productID && projectReport.productID.projectID.projectBuildDate }
                    

                />
                  <Typography paragraph>{projectReport.productID && projectReport.productID.productName}</Typography>
                <CardMedia
                    component="img"
                    height="194"
                    image={projectReport.productID && projectReport.productID.productPicture}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {projectReport.productID && projectReport.productID.productDescription}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <Button variant="outlined" color='error' onClick={() => handleDelete(projectReport.reportID)}>Delete</Button>
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
                      
                        <Typography variant="body2" color="text.secondary">
                        {projectReport.productID && projectReport.productID.productConvenience}
                        </Typography>
                      
                    </CardContent>
                </Collapse>
            </Card>

          <Review/>
        </>

    )
}




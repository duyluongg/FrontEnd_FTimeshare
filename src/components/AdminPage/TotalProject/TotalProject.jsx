import * as React from 'react';
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
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

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

const dataPrj = [
    {
        id: '1',
        img: '../image/prj/prj01.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img03.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'

    },
    {
        id: '2',
        img: '../image/prj/prj02.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0871, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img04.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '3',
        img: '../image/prj/prj03.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img05.jpg',
        imgCarousel3: 'image/room/img02.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '4',
        img: '../image/prj/prj04.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img06.jpg',
        imgCarousel2: 'image/room/img07.jpg',
        imgCarousel3: 'image/room/img08.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '5',
        img: '../image/prj/prj05.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img01.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '6',
        img: '../image/prj/prj06.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img08.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '7',
        img: '../image/prj/prj07.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img01.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
    {
        id: '8',
        img: '../image/prj/prj08.jpg',
        name: 'The Aston Vill Hotel',
        feedback: 5.0,
        adr: 'Alice Springs NT 0870, Australia',
        cost: 200.7,
        imgCarousel: 'image/room/img01.jpg',
        imgCarousel2: 'image/room/img02.jpg',
        imgCarousel3: 'image/room/img01.jpg',
        desribe0: 'With the beautiful landscape of the city at night, you will see the whole city with lights and chill music giving you relaxation and lightness in your soul. Coming to us, you will fully enjoy it. vacation with perfect services.',
        describe0service: ' Buffet breakfast, Mineral water in the room, Wireless Internet service (wifi)',
        describe0chkout: '12:00 daily',
        desribe0pay: ' Cash (VND, USD, EURO, ...) Visa and Master credit cards',
        desribe1: 'Liên hệ hotline: 1900 6750 để nhận được ưu đãi đặt phòng sớm nhất !'
    },
]

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems:'center', justifyContent:'center'}}>
                
                <TextField sx={{width: '500px', mb: '35px'}}
                    placeholder="Search..."
                    variant="outlined"
                    size="small"
                    defaultValue="Small"
                    // onChange={handleSearch}
                />
                <IconButton type="submit" aria-label="search" sx={{mb:'20px'}}>
                    <SearchIcon />
                </IconButton>
            </div>
            <Grid container spacing={1} sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', ml: '2' }}>


                {dataPrj.map((item) => (
                    <Card key={item.id} sx={{ maxWidth: 400, ml: '35px', mb: '15px', boxShadow: '3' }} >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {item.name[0]} {/* Lấy ký tự đầu của tên project làm avatar */}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.name}
                            subheader={`Feedback: ${item.feedback}`}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={item.img}
                            alt="Project image"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.adr}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="outlined" sx={{ m: 1 }}>
                                Accept
                            </Button>
                            <Button variant="outlined" color="error" >
                                REJECT
                            </Button>
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
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))}

            </Grid>
        </>
    );
}


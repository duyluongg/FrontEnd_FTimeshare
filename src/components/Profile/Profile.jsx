import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Profile({ getData }) {
    console.log(getData);

    // useEffect(() => {
    //     if (getData) {
    //         fetchDataUser(getData);
    //     }
    // }, [getData]);

    useEffect(() => {
        if (getData) {
            fetchDataUser(getData);
        }
    }, [getData]);

    const [accountUser, setAccountUser] = useState();
    const fetchDataUser = async (getData) => {
        // console.log(getData);
        try {
            const [accountResponse, imagesResponse] = await Promise.all([
                axios.get(`https://bookinghomestayswp.azurewebsites.net/api/users/viewDetail/${getData}`),
                // axios.get('http://localhost:8080/api/pictures/customerview'),

            ]);

            // const formattedBirthday = new Date(accountResponse.data.accBirthday);
            // const dd = String(formattedBirthday.getDate()).padStart(2, '0');
            // const mm = String(formattedBirthday.getMonth() + 1).padStart(2, '0');
            // const yyyy = formattedBirthday.getFullYear();
            // const formattedDate = `${dd}/${mm}/${yyyy}`;


            // const formattedData = { ...accountResponse.data, accBirthday: formattedDate };

            const formattedBirthday = format(new Date(accountResponse.data.accBirthday), 'dd/MM/yyyy');


            const formattedData = { ...accountResponse.data, accBirthday: formattedBirthday };
            setAccountUser(formattedData);
            console.log(accountResponse.data);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    return (


        <div>
            {accountUser && (

                <div>

                    <div className='profile-flex'>
                        <div className='profile-left'>
                            <Avatar
                                alt="Remy Sharp"
                                src={accountUser.imgName}
                                sx={{ width: 96, height: 96, mt: "40px", mb: "20px", objectFit: "cover" }}
                            />
                            <h2>{accountUser.accName}</h2>
                            <Link to={`/update-profile`}>
                                <button>Edit</button>
                            </Link>



                        </div>
                        <div className='profile-right-big'>
                            <div>
                                <h2 className='profile-title-info'>Information</h2>
                                <div className='profile-right'>
                                    <div>
                                        <h2 className='profile-title'>Email:</h2>
                                        <p> {accountUser.accEmail}</p>
                                        <h2 className='profile-title'>Phone:</h2>
                                        <p>{accountUser.accPhone}</p>
                                    </div>
                                    <div>
                                        <h2 className='profile-title'>BirthDay:</h2>
                                        <p>{accountUser.accBirthday}</p>
                                        <h2 className='profile-title'>Role:</h2>
                                        <p>Customer</p>

                                    </div>
                                </div>
                            </div>

                            {/* <div>
                                <h2 className='profile-title-info'>Project</h2>
                                <div className='profile-right'>
                                    <div>
                                        <h2 className='profile-title'>Email:</h2>
                                        <p> {accountUser.accEmail}</p>
                                        <h2 className='profile-title'>Phone:</h2>
                                        <p>{accountUser.accPhone}</p>
                                    </div>
                                    <div>
                                        <h2 className='profile-title'>Username:</h2>
                                        <p>{accountUser.roleID}</p>
                                        <h2 className='profile-title'>Location:</h2>
                                        <p>{accountUser.accStatus}</p>

                                    </div>
                                </div>
                            </div> */}
                        </div>


                    </div>
                </div>
            )}
        </div>
    )
}

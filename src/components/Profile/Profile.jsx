import React from 'react'
import Avatar from '@mui/material/Avatar';
const user = {
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    phone: "0399191045",
    location: 'New York, USA',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    avatar: 'https://example.com/avatar.jpg'
};

export default function Profile() {
    return (
        <div>
       
        
            <div className='profile-flex'>
                <div className='profile-left'>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 96, height: 96 }}
                    />
                    <h2>{user.name}</h2>

                </div>
                <div className='profile-right-big'>
                    <div>
                        <h2 className='profile-title-info'>Information</h2>
                        <div className='profile-right'>
                            <div>
                                <h2 className='profile-title'>Email:</h2>
                                <p> {user.email}</p>
                                <h2 className='profile-title'>Phone:</h2>
                                <p>{user.phone}</p>
                            </div>
                            <div>
                                <h2 className='profile-title'>Username:</h2>
                                <p>{user.username}</p>
                                <h2 className='profile-title'>Location:</h2>
                                <p>{user.location}</p>

                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='profile-title-info'>Project</h2>
                        <div className='profile-right'>
                            <div>
                                <h2 className='profile-title'>Email:</h2>
                                <p> {user.email}</p>
                                <h2 className='profile-title'>Phone:</h2>
                                <p>{user.phone}</p>
                            </div>
                            <div>
                                <h2 className='profile-title'>Username:</h2>
                                <p>{user.username}</p>
                                <h2 className='profile-title'>Location:</h2>
                                <p>{user.location}</p>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

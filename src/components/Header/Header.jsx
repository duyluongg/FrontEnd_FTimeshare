import React from 'react'
import Image from '../../assets/img.jpg'
import ImageGray from '../../assets/imggray.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <section>
            <section className='header-background' style={{ backgroundImage: `url(${Image}` }}>
                <div className='content'>
                    <h1>Enjoy the sunset in the best place</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non unde quas eius alias ipsam iste explicabo maxime beatae laboriosam quidem!</p>
                    <a href='#'>Start now</a>
                </div>
            </section>
            <section className='header-gray'>
                <div className='header-gray-img'>
                    <img src={ImageGray} alt="" />
                </div>

                <div className='header-gray-title'>
                    <h1>We Are The Best And Trusted Timeshare Project</h1>
                    <p>We are delighted to share with you a special journey where the vacation experience is more than just accommodation; it's a sophisticated blend of luxury and flexibility. Awakened by the idea of creating unforgettable moments, the F-Timeshare is where you can take control of your itinerary, relish in private spaces, and explore fantastic destinations worldwide.</p>
                    <button>
                        <a href='#'>More <FontAwesomeIcon icon={faArrowRight} /> </a>
                    </button>
                </div>
            </section>
        </section>


    )
}

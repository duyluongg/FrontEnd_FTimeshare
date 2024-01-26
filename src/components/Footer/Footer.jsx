import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-item'>
                <div className='footer-item-contact'>
                    <h3>HOTLINE FOR SUPPORT</h3>
                    <h3>19005436</h3>
                </div>

                <div className='footer-item-contact' >
                    <h3 className='footer-item-contact-title'>CONTACT WITH US</h3>
                    <div className='icon-mxh'>
                        <FontAwesomeIcon icon={faFacebook} size='2xl' />
                        <FontAwesomeIcon icon={faTwitter} size='2xl' />
                        <FontAwesomeIcon icon={faInstagram} size='2xl' />
                        <FontAwesomeIcon icon={faYoutube} size='2xl' />
                    </div>
                </div>

                <div className='footer-item-contact'>
                    <h3>EMAIL FOR SUPPORT</h3>
                    <h3>F_Timeshare@gmail.com</h3>
                </div>
            </div>
        </div>
    )
}

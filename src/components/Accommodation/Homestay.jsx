import React, { useState, useEffect } from 'react'
import './Homestay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Homestay() {
    return (
        <>
            <div className='a6e267116d'>
                <div className='f29a6defed'>
                    <form>
                        <div data-testid="searchbox-layout-wide" className='ffb9c3d6a3 c9a7790c31 e691439f9a'>
                            <div className='e22b782521'>
                                <div className='b7ab62d599'>
                                    <div className='c3ffd29f4e bc4cc43c81'>
                                        <div className='a53cbfa6de ac9267e216 a20293ec70 d974f7747b'>
                                            <div className='b9b84f4305'>
                                                <div className='e000754250'>
                                                    <div className='eac0b6e5ba'>
                                                        <span className="fcd9eec8fb d24fc26e73 c696a7d242" aria-hidden="true">
                                                            <FontAwesomeIcon icon={faLocationDot} />
                                                        </span>
                                                    </div>
                                                    <input
                                                        name='ss'
                                                        className='eb46370fe1'
                                                        placeholder='Where do you want to go?'
                                                        autoComplete='off'
                                                        aria-autocomplete='list'
                                                        aria-controls='autocomplete-results'
                                                        aria-haspopup='listbox'
                                                        aria-label='Where do you want to go?'
                                                        aria-expanded='false'
                                                        role='combobox'
                                                        id=''
                                                        value="Location"
                                                    >
                                                    </input>
                                                    <div class="e7e5251f68 c96fa981fd"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="acf75b5882"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


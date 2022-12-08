import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Bottom = () => {

    var year = new Date().getFullYear();

    return (
        <div className='mw-100 text-white mt-5 pt-5'>
            <div className='container mb-5 mt-5 pt-5 pb-5'>
                <div className='row d-flex justify-content-center mt-5 pt-5'>
                    <div className='col col-lg-5 text-start display-5 font-TTB'>
                        Connect with us
                    </div>
                    <div className='col text-start'>
                        <div className='font-TTB mb-3 h3'>
                            <span className='text-uppercase'>EMAIL</span>
                        </div>
                        <div className='fs-6 mb-3'>
                            info@theme.com.hk
                        </div>
                        <div className='font-TTB mb-3 h3'>
                            <span className='text-uppercase'>SOCIAL MEDIA</span>
                        </div>
                        <div className='mb-2'>@Rarebbit</div>
                        <div><SocialIcon url="https://www.instagram.com/rarebbit.theme/" bgColor='#FFF' network='instagram' /></div>
                        
                    </div>
                    <div className='col text-start'>
                        <div className=''>Website best view on desktop</div>
                        <div>Copyright&copy;{year} Theme</div>
                    
                        <div className='text-start mt-4 pt-3'>
                            <div className='mb-1' role={'button'} onClick={() => {
                                window.location.href = '/tc';
                            }}>Terms and Conditions</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center w-100'>
                <div className='row d-flex justify-content-center bg-7DFE p-5 opacity-75'>
                    <div style={{width: '100px'}}>
                        <img className='img-fluid' src={require('../Resources/Asset/images/Main_btm_theme_logo_orange.png')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bottom;
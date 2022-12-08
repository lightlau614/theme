import React from 'react';
import { SocialIcon } from 'react-social-icons';

const Collection_Bottom = () => {
    var year = new Date().getFullYear();
    return (
        <div className='mw-100 mt-5 pt-5'>
            <div className='container mb-5'>
                <div className='row d-flex justify-content-center'>
                    <div className='text-start display-5 font-TTB color-7DFE'>
                        Connec<span>t</span> with us
                    </div>
                    <div className='text-start mt-4'>
                        <div className='font-TTB mb-1 fs-4'>
                            <span className='text-uppercase'>EMAIL</span>
                        </div>
                        <div className='fs-6'>
                            info@theme.com.hk
                        </div>
                    </div>
                    <div className='text-start mt-4'>
                        <div className='font-TTB mb-1 fs-4'>SOCIAL MEDIA</div>
                        <div className='row'>
                            <div className='col p-0'>
                                <div className=''>@rarebbit.theme</div>
                                <div className='pt-2'>
                                    <SocialIcon url="https://www.instagram.com/rarebbit.theme/" bgColor='#F9A01B' network='instagram' style={{width: '40px', height: '40px'}} className='' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-start mt-4'>
                        <div className=''>Website best viewed on desktop</div>
                        <div>Copyright&copy;{year} Theme</div>
                    </div>
                    <div className='text-start mt-4'>
                        <div className='mb-1' onClick={() => {
                            window.location.href = '/tc';
                        }}>Terms and Conditions</div>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center w-100'>
                <div className='row d-flex justify-content-center bg-7DFE p-5 opacity-75'>
                    <div style={{width: '75px'}}>
                        <img className='img-fluid' src={require('../Resources/Asset/images/Main_btm_theme_logo_orange.png')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection_Bottom;
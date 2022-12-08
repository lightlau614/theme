import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// DialogBox
import UserBox from '../Mobile_Components/UserBox';

const Collection_Header = () => {

    const navigate = useNavigate();
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');

    const passLogin = async (item:any) => {
        setOpenLogin(item);
        setGetForget(false);
    }

    const passForget = async (item:any) => {
        setOpenLogin(false);
        setGetForget(item);
    }

    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        <>
            <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
            <div className='logo-area logo mt-3 mb-3 w-75'>
                <img className='img-fluid' src={require('../Resources/Asset/images/Logo.png')} onClick={handleGoHome} role='button' />
            </div>
            <div>
                <div className='col col-md-auto row text-white'>
                    <div className='col my-auto' role='button' onClick={()=>{navigate('/gallery')}}>
                        Gallary
                    </div>
                    <div className='col col-md-auto my-auto'>
                        {sessionStorage.getItem('token')?
                            (
                                <>
                                    <div role='button' onClick={()=>{navigate('/me')}}>
                                        My Profile
                                    </div>
                                </>
                            )
                            
                            : 
                            (
                                <>
                                    <div role='button' onClick={()=>{passLogin(true)}}>
                                        Login
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Collection_Header;
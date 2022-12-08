import React from 'react';

const Header = () => {

    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        <div className='col logo mt-3 ms-3 me-3'>
            <img className='img-fluid' src={require('../Resources/Asset/images/Logo.png')} onClick={handleGoHome} role='button'/>
        </div>
    );
};

export default Header;
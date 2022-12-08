import React from 'react';

const MenuArea = () => {
    return (
        <div className='banner-box position-relative'>
            <div className='row w-80 position-absolute div-center'>
                    <div className='col col-lg-auto'>
                        <img src={require('../Resources/Asset/images/Digital_Fabric.png')} />
                    </div>
                    <div className='col col-lg-auto'>
                        <img src={require('../Resources/Asset/images/Design_Co-create.png')} />
                    </div>
                    <div className='col col-lg-auto'>
                        <img src={require('../Resources/Asset/images/Garment_NFT.png')} />
                    </div>
                    <div className='col col-lg-auto'>
                        <img src={require('../Resources/Asset/images/Crowd_Funding.png')} />
                    </div>
            </div>
        </div>
    );
};

export default MenuArea;
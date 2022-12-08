import React, { useState, useEffect} from 'react';
import styled from 'styled-components'

//Component
import Slidebar from '../Mobile_Components/Slidebar';
import Collection_Header from '../Mobile_Components/Collection_Header';
import Collection_Bottom from '../Mobile_Components/Collection_Bottom';

// DialogBox
import TokenBox from '../Mobile_Components/TokenBox';
import UserBox from '../Mobile_Components/UserBox';
import SpinImage from '../Mobile_Components/SpinImage';

const StyledBurgerMenu = styled.div`
    .bm-burger-bars{
    background: #F9A01B;
    }
`;

const Collaboration = () => {

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');

    const passToken = async ( item:any ) =>{
        setOpenToken(item);
        setOpenLogin(false);
        setOpenDraw(false);
        setGetForget(false);
    }

    const passLogin = async (item:any) => {
        setOpenLogin(item);
        setOpenToken(false);
        setOpenDraw(false);
        setGetForget(false);
    }

    const passDraw = async (item:any) => {
        setOpenLogin(false);
        setOpenToken(false);
        if(item.length){
            setOpenDraw(item[0].open);
            setDrawImage(item[0].img);
        }else{
            setOpenDraw(false);
            setDrawImage('');
        }
        setGetForget(false);
    }
    
    const passForget = async (item:any) => {
        setOpenLogin(false);
        setOpenToken(false);
        setOpenDraw(false);
        setGetForget(item);
    }

    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        <>
            <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
            <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />
            <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
            <div className='row d-flex bg-7DFE'>
                <Collection_Header />
                <div className='col-lg-1 p-2'>
                    <StyledBurgerMenu>
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget}/>
                    </StyledBurgerMenu>
                </div>
            </div>
            <div className='container'>
                {/* <div className='row d-flex bg-7DFE'>
                    <div className='col-lg-1 p-2'>
                        
                    </div>
                </div> */}
                <div className='row lh-3 fs-4'>
                    <div className='col text-start'>
                        <span className='font-TT'><span role='button' onClick={handleGoHome}>Home</span> / </span><span className='font-QSB'>Collaboration</span>
                    </div>
                </div>
                <div className='row'>
                    <div className='display-5 text-start color-7DFE mt-3 mb-3 font-TTB'>
                        Collaorations and Partnerships
                    </div>
                    <div className='font-TT'>
                        <div className='mt-3 mb-3 lh-2'>
                            Are you a <b className='font-TTB'>3D designer</b> and want to work with us and lis<span>t</span> your digital garment on THEME? 
                            Send your portfolio to info@theme.com / Subjec<span>t</span>: 3D Fashion Designer to join THEME
                        </div>
                        <div className='mt-3 mb-3 lh-2'>
                            Are you a <b className='font-TTB'>fashion brand</b> and you have more ideas on how to work with THEME?  
                            We are glad to hear from you at info@theme.com / Subjec<span>t</span>: Brand
                        </div>
                        <div className='mt-3 mb-3 lh-2'>
                            Are you a <b className='font-TTB'>fabric supplier</b> and you would like to sell your digital fabric with THEME? 
                            Send a email to info@theme.com / Subjec<span>t</span>: Supplier
                        </div>
                        <div className='mt-3 mb-3 lh-2'>
                            If none of the above is applicable, but you s<span>t</span>ill want to collaborate,
                            We are waiting for you at info@theme.com / Subjec<span>t</span>: Collaboration
                        </div>
                    </div>
                </div>
            </div>
            <Collection_Bottom />
        </>
    );
};

export default Collaboration;
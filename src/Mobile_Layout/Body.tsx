import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { BiUpArrowCircle } from 'react-icons/bi'

//Component
import Header from '../Mobile_Components/Header';
import Slidebar from '../Mobile_Components/Slidebar';
import Bottom from '../Mobile_Components/Bottom';

// DialogBox
import TokenBox from '../Mobile_Components/TokenBox';
import UserBox from '../Mobile_Components/UserBox';
import SpinImage from '../Mobile_Components/SpinImage';

import image from '../Resources/Asset/images/BG.jpg';

const Body = () => {

    const navigate = useNavigate();

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

    const handleClickCollaboration = () =>{
        window.location.href = '/Collaborations';
    }

    const handleClickcollection = () =>{
        navigate('/collection');
    }

    return (
        <>
            <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
            <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />
            <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
            <div className='bg-video-area' style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '100vh', opacity: '0.9', backgroundSize: 'cover'}}>
                {/* <video loop autoPlay muted id="bg-video" src={require('../Resources/Asset/video/BackgroundVideo.mp4')} >
                    <source src={require('../Resources/Asset/video/BackgroundVideo.mp4')} type="video/mp4" />
                </video> */}
                {/* <img className='img-fluid' src={require('../Resources/Asset/images/BG.jpg')} /> */}
            </div>
            
            <div className='main-body'>
                <div className='row d-flex justify-content-center'>
                    <Header />
                    <div className='col-2'>
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget} />
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className=''>
                            <div>
                                <img className='img-fluid' src={require('../Resources/Asset/images/CNY-Hoodie-Red-with-graphic_diffusion.gif')} />
                            </div>
                        </div>
                        <div className='mb-5 pb-5'>
                            <div className='mt-3 mb-3'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Image_THEMExSilkism.png')} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className='text-white bg-7DFE product-button w-50 ' role='button' onClick={handleClickcollection}> 
                                    Discover More
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row d-flex justify-content-center mt-3 mb-5 pb-5'>
                        <div className='text-white mb-3'>
                            <div className='font-TTB fs-1'>
                                Who We Are
                            </div>
                        </div>
                        <div className=''>
                            <div>
                                <img className='img-fluid' src={require('../Resources/Asset/images/theme-dg-fh.png')} />
                            </div>
                        </div>
                        
                        <div className='text-white mt-3'>
                            <div className='font-QS fs-7'>
                                We are digital fashion house and 
                                specialized in generative art. Our digital 
                                fashion platform "THEME" allows everyone to choose your favourite digital 
                                art and then transform to a real and 
                                physical garment. Let’s start with our first 
                                project "THEME X Silkism" generative art 
                                hoodies collection!
                            </div>
                        </div>
                        
                    </div>

                    <div className='row d-flex justify-content-center text-white mt-3 mb-5 pb-5'>
                        <div className='fs-1 mb-3 pb-3'>
                            <div>
                                Our <span className='font-TTB'>Assets</span>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center position-relative p-0'>
                            <div className='w-50 p-4'>
                                <div className='position-relative mobile_tag_1'>
                                    <Link to='/#digtal' className='text-white'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_purple.png')}
                                        onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_digital_fabric.png')}
                                        onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_purple.png')}
                                    />
                                    <div className='position-absolute div-center w-100 top-50 start-50 translate-middle text-white'>
                                        Digital Fabric
                                    </div></Link>
                                </div>
                            </div>
                            <div className='w-50 p-4'>
                                <div className='position-relative mobile_tag_2'>
                                    <Link to='/#Offer' className='text-white'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_orange.png')}
                                        onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_design.png')}
                                        onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_orange.png')}
                                    />
                                    <div className='position-absolute div-center w-100 top-50 start-50 translate-middle text-white'>
                                        Design &<br />Co-create
                                    </div></Link>
                                </div>
                            </div>
                            <div className='w-50 p-4'>
                                <div className='position-relative mobile_tag_3'>
                                    <Link to='/#NFT' className='text-white'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_purple.png')}
                                        onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_NFT.png')}
                                        onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_purple.png')}
                                    />
                                    <div className='position-absolute div-center w-100 top-50 start-50 translate-middle text-white'>
                                        Garment NFT
                                    </div></Link>
                                </div>
                            </div>
                            <div className='w-50 p-4'>
                                <div className='position-relative mobile_tag_4'>
                                    <Link to='/#Crowd' className='text-white'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_orange.png')}
                                        onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_crowdfunding.png')}
                                        onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_orange.png')}
                                    />
                                    <div className='position-absolute div-center w-100 top-50 start-50 translate-middle text-white'>
                                        Crowd Funding
                                    </div></Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='row d-flex justify-content-center mt-3' id='digtal'>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Main_What_We_Offer.png')} />
                        </div>
                        {/* <div className='row d-flex justify-content-center'>
                            <div className='col'>
                                <Link to='/#digtal'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div> */}
                    </div>
                    
                    <div className='row d-flex justify-content-center mt-3' >
                        <div className=''>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Main_Digital_n_Physical.png')} />
                        </div>
                        <div className=' text-white mt-3'>
                            <div className='fs-1 mb-3 font-TT'>
                                Sell Your Fabric in <br /><span className='color-7DFE font-TTB'>Digital</span> & <span className='color-F91B font-TTB'>Physical</span> Form
                            </div>
                            <div className='fs-7 font-TT'>
                                With us, we can help suppliers to 
                                transform their physical fabric 
                                into digital fabric. Suppliers can 
                                sell their fabric in both digital &
                                Physical way.  Also to verify 
                                sustainable fabric and digital 
                                fabric source with our platform.
                            </div>
                        </div>
                        
                        {/* <div className='row d-flex justify-content-center'>
                            <div className='col'>
                                <Link to='/#Library'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div> */}
                    </div>
                        
                    <div className='row d-flex justify-content-center text-white pt-5 mt-5 pb-5 mb-5 '>
                        <div className='display-5 mb-3 font-TT' id='Library'>
                            Digital Fabric Library
                        </div>
                        <div className='col col-sm-12 border-radius-25'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Main_Digital_Fabric.png')} />
                        </div>
                        {/* <div className='col col-sm-3 bg-7DFE border-radius-25 pb-5 m-4 pt-3'>
                            <div className=''>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Digital_fabric001.png')} />
                            </div>
                            
                            <div className='row'>
                                <div className='col fs-5 font-TTB text-start mt-2 mb-2'>
                                    SCN2203967JLFZ<br />JACQUARD
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col fs-5 text-start'>
                                    HK$ 23.5/m
                                </div>
                            </div>
                        </div>
                        <div className='col col-sm-3 bg-7DFE border-radius-25 pb-5 m-4 pt-3'>
                            
                            <div className=''>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Digital_fabric002.png')} />
                            </div>
                            
                            <div className='row'>
                                <div className='col fs-5 font-TTB text-start mt-2 mb-2'>
                                    SCN2203967JLFZ<br />JACQUARD
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col fs-5 text-start'>
                                    HK$ 23.5/m
                                </div>
                            </div>
                        </div>
                        <div className='col col-sm-3 bg-7DFE border-radius-25 pb-5 m-4 pt-3'>
                            
                            <div className=''>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Digital_fabric003.png')} />
                            </div>
                            
                            <div className='row'>
                                <div className='col fs-5 font-TTB text-start mt-2 mb-2'>
                                    SCN2203967JLFZ<br />JACQUARD
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col fs-5 text-start'>
                                    HK$ 23.5/m
                                </div>
                            </div>
                        </div> */}
                        <div className='row d-flex justify-content-center mt-4'>
                            <div className='text-white bg-F91B border-radius-25 lh-3 w-75 fs-5 mobile_font'>
                                Stay Tuned
                            </div>
                        </div>
                    </div>
                      
                    <div className='row d-flex justify-content-center pt-5 mt-5'>
                        <div id='Offer'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Main_What_We_Offer_Designer.png')} />
                        </div>
                        {/* <div>
                            <Link to='/#NFT'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                        </div> */}
                    </div> 
                        
                    <div className='row d-flex justify-content-end'>
                        <div className='text-end text-white mt-5 w-75'>
                            <div className='fs-1' id='NFT'>
                                Create your<br /><span className='font-TTB'>One of a Kind</span> NFT
                            </div>
                        </div>
                        <div className='text-end text-white w-100'>
                            <div className='fs-7'>
                                Are you an artist or a designer trying to turn your<br/>
                                work into a Non-Fungible Token? Make money<br/>
                                by selling your one-of-<br/>a-kind artworks as<br/>NFTs on our 
                                platform.
                            </div>
                        </div>
                        <div className='' style={{marginTop: '-12%'}}>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Main_NFT_n_Crowd_Fund.png')} />
                        </div>
                        
                    </div>
                    <div className='row d-flex justify-content-start pb-5 mb-5' style={{marginTop: '-12%'}}>
                        <div className='text-start text-white w-75'>
                            <div className='fs-1 ' id='NFT'>
                                <span className='color-7DFE'>Digital</span> to<br /><span className='color-F91B'>Physical</span> Garment
                            </div>
                        </div>
                        <div className='text-start text-white w-100'>
                            <div className='fs-7'>
                                Crowdfunding enables designers to pitch 
                                their new products to public without any 
                                inventory problem. The new buying model 
                                and made to order concept could also help 
                                the environment and produce less waste.
                            </div>
                        </div>
                    </div>
                    {/* <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col text-start text-white mt-5 pt-5 mb-5'>
                            <div className='display-5 mb-3'>
                                <span className='color-7DFE'>Digital</span> to<br /><span className='color-F91B'>Physical</span> Garment
                            </div>
                            <div className='fs-4'>
                                Crowdfunding enables designers to pitch 
                                their new products to public without any 
                                inventory problem. The new buying model 
                                and made to order concept could also help 
                                the environment and produce less waste.
                            </div>
                        </div> */}
                        {/* <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/crowd_fund.png')} />
                        </div> */}
                        {/* <div className='row d-flex justify-content-center'>
                            <div className='col-1'>
                                <Link to='/#Crowd'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>

                <div className='bg-7DFE text-white pt-5 pb-5 mb-5 mt-5'>
                    <div className='container pt-5 mt-5 pb-5 mb-5' id='Crowd'>
                        <div className='b-2 lh-2 mb-3 pt-5 mt-5'>
                            <div className='font-TTB h1 display-5'>
                                We Need You
                            </div>
                            <div className='font-TT display-5'>
                                in the <span className='font-TTB'>Coming Seasons</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='bg-F91B border-radius-25 w-75 mt-3 p-2' role='button' onClick={handleClickCollaboration}>
                                <span onClick={handleClickCollaboration} className='text-white'>I WANT TO PARTICIPATE IN THE NEXT SEASON</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='color-F91B border-radius-25 mt-5 mb-5'>
                                <BiUpArrowCircle style={{width: '75px', height: '75px'}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <Bottom />
            </div>
            <div className='position-fixed bottom-0 mb-5 w-100 d-flex justify-content-end'>
                <div className='me-3' role='button' onClick={()=>{window.scrollTo({top: 0})}}>
                    <img className='img-fiuld' src={require('../Resources/Asset/images/image_down_white.png')} />
                </div>
            </div>
        </>
    );
};

export default Body;    
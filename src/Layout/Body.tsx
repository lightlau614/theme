import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { BiUpArrowCircle } from 'react-icons/bi'

//Component
import Header from '../Components/Header';
import Slidebar from '../Components/Slidebar';
import Bottom from '../Components/Bottom';

// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

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
            <div className='bg-video-area'>
                <video loop autoPlay muted id="bg-video" src={require('../Resources/Asset/video/BackgroundVideo.mp4')} >
                    <source src={require('../Resources/Asset/video/BackgroundVideo.mp4')} type="video/mp4" />
                </video>
            </div>
            
            <div className='main-body'>
                <div className='row d-flex justify-content-center'>
                    <Header />
                    <div className='col'>
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget} />
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <div className='Title'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Title_new.png')} />
                            </div>
                            <div className='text-white bg-7DFE product-button' role='button' onClick={handleClickcollection}> 
                                Discover More
                            </div>
                        </div>
                        <div className='col'>
                            <div>
                                <img className='img-fluid' src={require('../Resources/Asset/images/CNY-Hoodie-Red-with-graphic_diffusion.gif')} />
                            </div>
                        </div>
                    </div>
                    
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col text-start text-white pt-5 mt-5'>
                            <div className='font-TTB display-5 text-align-left mb-3'>
                                Who We Are
                            </div>
                            <div className='font-QS fs-4'>
                                We are digital fashion house and 
                                specialized in generative art. Our digital 
                                fashion platform "THEME" allows everyone to choose your favourite digital 
                                art and then transform to a real and 
                                physical garment. Let’s start with our first 
                                project "THEME X Silkism" generative art 
                                hoodies collection!
                            </div>
                        </div>
                        <div className='col'>
                            <div>
                                <img className='img-fluid' src={require('../Resources/Asset/images/theme-dg-fh.png')} />
                            </div>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center pt-5 mt-5 text-white'>
                            <div className='row d-flex justify-content-center position-relative display-5 pb-5 mb-5'>
                                <div>
                                Our <span className='font-TTB'>Assets</span>
                                </div>
                            </div>
                            <div className='col position-relative'>
                                <Link to='/#digtal'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_purple.png')} style={{marginTop:'25%', marginLeft: '25%'}}
                                    onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_digital_fabric.png')}
                                    onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_purple.png')}
                                />
                                <div className='position-absolute div-center w-100 text-white' style={{marginTop:'12%', marginLeft: '23%'}}>
                                    Digital Fabric
                                </div></Link>
                            </div>
                            <div className='col position-relative'>
                                <Link to='/#Offer'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_orange.png')} style={{marginTop:'-25%', marginLeft: '5%'}}
                                    onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_design.png')}
                                    onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_orange.png')}
                                />
                                <div className='position-absolute div-center w-100 text-white' style={{marginTop:'-35%', marginLeft: '4%'}}>
                                    Design & Co-create
                                </div></Link>
                            </div>
                            <div className='col position-relative'>
                                <Link to='/#NFT'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_purple.png')} style={{marginTop:'25%', marginLeft: '-25%'}}
                                    onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_NFT.png')}
                                    onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_purple.png')}
                                />
                                <div className='position-absolute div-center w-100 text-white' style={{marginTop:'12%', marginLeft: '-11%'}}>
                                    Garment NFT
                                </div></Link>
                            </div>
                            <div className='col position-relative'>
                                <Link to='/#Crowd'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Main_Btn_orange.png')} style={{marginTop:'-25%', marginLeft: '-60%'}}
                                    onMouseOver={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_crowdfunding.png')}
                                    onMouseOut={ e => e.currentTarget.src=require('../Resources/Asset/images/Main_Btn_orange.png')}
                                />
                                <div className='position-absolute div-center w-100 text-white' style={{marginTop:'-35%', marginLeft: '-28%'}}>
                                    Crowd Funding
                                </div></Link>
                            </div>
                    </div>
                    
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Word1.png')} />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-1'>
                                <Link to='/#digtal'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col text-start text-white mt-5 pt-5 mb-5'>
                            <div className='display-5 mb-3' id='digtal'>
                                Sell Your Fabric in <span className='color-F91B font-TTB'>Digital</span> & <span className='color-7DFE font-TTB'>Physical</span> Form
                            </div>
                            <div className='fs-4'>
                                With us, we can help suppliers to 
                                transform their physical fabric 
                                into digital fabric. Suppliers can 
                                sell their fabric in both digital &
                                Physical way.  Also to verify 
                                sustainable fabric and digital 
                                fabric source with our platform.
                            </div>
                        </div>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/World2.png')} />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-1'>
                                <Link to='/#Library'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div>
                    </div>
                        
                    <div className='row d-flex justify-content-center text-white pt-5 pb-5 mb-5 mt-5'>
                        <div className='display-5 mb-3' id='Library'>
                            Digital Fabric Library
                        </div>
                        <div className='col col-sm-3 bg-7DFE border-radius-25 pb-5 m-4 pt-3'>
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
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='text-white bg-F91B border-radius-25 lh-3 w-25'>
                                Stay Tuned
                            </div>
                        </div>
                    </div>
                      
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div id='Offer'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Word.png')} />
                        </div>
                        <div>
                            <Link to='/#NFT'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                        </div>
                    </div> 
                        
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col text-start text-white mt-5 pt-5'>
                            <div className='display-5' id='NFT'>
                                Create your<br /><span className='font-TTB'>One of a Kind</span> NFT
                            </div>
                            <div className='fs-4'>
                                Are you an artist or a designer 
                                trying to turn your work into a 
                                Non-Fungible Token? Make 
                                money by selling your one of a 
                                kind artworks as NFTs on our 
                                platform.
                            </div>
                        </div>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/World3.png')} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
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
                        </div>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/crowd_fund.png')} />
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-1'>
                                <Link to='/#Crowd'><img src={require('../Resources/Asset/images/DownArrow.png')} /></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-7DFE text-white pt-5 pb-5 mb-5 mt-5'>
                    <div className='container pt-5 mt-5 pb-5 mb-5' id='Crowd'>
                        <div className='b-2 lh-2 mb-3 pt-5 mt-5'>
                            <div className='font-TTB h1 display-4'>
                                We Need You.
                            </div>
                            <div className='font-TT display-4'>
                                in the <span className='font-TTB'>Coming Seasons</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='bg-F91B border-radius-25 lh-3 w-50 mt-3' role='button' onClick={handleClickCollaboration}>
                                I WANT TO PARTICIPATE IN THE NEXT SEASON
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className='color-F91B border-radius-25 lh-3 mt-5 mb-5'>
                                <BiUpArrowCircle style={{width: '75px', height: '75px'}}/>
                            </div>
                        </div>
                    </div>
                </div>

                <Bottom />
            </div>
            <div className='position-fixed end-0 bottom-0 mt-0 ms-0 me-5 mb-5 p-0 w-100 d-flex justify-content-end'>
                <div role='button' onClick={()=>{window.scrollTo({top: 0})}}>
                    <img className='img-fiuld' src={require('../Resources/Asset/images/image_down_white.png')} />
                </div>
            </div>
        </>
    );
};

export default Body;    
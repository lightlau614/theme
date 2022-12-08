import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { HashLink as Link } from 'react-router-hash-link';

//Component
import Header from '../Components/Header';
import MyMarquee from '../Components/MyMarquee';
import Slidebar from '../Components/Slidebar';
import Bottom from '../Components/Bottom';
import MyCarousel from '../Components/Carousel';
import Ranking from '../Components/Ranking';

// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

//Resource
import BackgroundImage from '../Resources/Asset/images/background.png';

import fetch from '../Services/fetch';

const Main = () => {

    const param = useParams();
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
        setOpenLogin(true);
        setOpenToken(false);
        setOpenDraw(false);
        setGetForget(item);
    }

    useEffect(()=>{
        if(Object.keys(param).length > 0){
            if (param.token){
                passForget(param);
            }
            else if (param.TransferToken){
                fetch.handleTransfer(param.TransferToken)?.then((response)=>{
                    console.log(response);
                    if (response.data.body.message === "SUCCESS"){
                        alert("Transfer Completed! Please check your profile.");
                    }else{
                        alert(response.data.body.message);
                    }
                })
            }
            else if (param.VerifyToken){
                fetch.handleVerify(param.VerifyToken);
                passLogin(true);
            }
        }
    },[]);

    return (
        <>
            <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
            <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />
            <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
                
            <div className='main-body' 
                style={{
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundSize: 'contain',
                    }}>
                <div className='row d-flex justify-content-center'>
                    <Header />
                    <div className='col'>
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget} />
                    </div>
                </div>
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col w-100 position-relative d-flex justify-content-center'>
                            <div className='w-100 d-flex justify-content-center' style={{marginTop: '-100px'}}>
                                <div className='position-relative w-75'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Image_back_light.png')}/>
                                </div>
                                <div className='top-50 start-50 position-absolute translate-middle center'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/CNY-Hoodie-Red-with-graphic_diffusion.gif')}/>
                                </div>
                            </div>
                            <div className='w-75 top-50 start-50 position-absolute translate-middle center collection_topic'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Image_THEMExSilkism.png')} />
                            </div>
                        </div>
                    </div>
            
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col d-flex justify-content-center position-relative' style={{minWidth: "800px", minHeight: "600px"}}>
                            <ReactPlayer className='position-relative mh-100 mw-100'
                                url='https://www.youtube.com/watch?v=FmPnBC97USA'
                                // url={[{src: 'resources/video/Big_Buck_Bunny_1080_10s_1MB.mp4', type:'video/mp4'}]}
                                playing={true}
                                controls={true}
                                loop={true}
                                width={'100%'}
                                height={'100%'}
                                playsinline={true}
                                muted
                                />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5' >
                        <div className='col text-start text-white mt-4 pt-4 mb-5 ms-5 rarebbit_intro_content'>
                            <div className='display-5 mb-3 font-TTB rarebbit_intro_content_topic'>
                                Introducing Rarebbit
                            </div>
                            <div className='fs-5 font-TT rarebbit_intro_content_content'>
                                <p className='text-uppercase font-TTB'>Rarebbit is Theme's first generative art collection.</p>
                                <p>Being the first member of Hands Up Crew. Each Rarebbit 
                                is generative by concept-software that works to produce 
                                unique, rare and <b className='text-uppercase font-TTB'>ONE-OF-A-KIND</b> digital fashion art.</p>
                                
                            </div>
                            <div className='fs-5 font-TT rarebbit_intro_content_content'>
                                Each Rarebbits have their own personalities and if you 
                                want to discover more, draw your own Rarebbit now by 
                                signing up on our website!
                            </div>
                            <div className='d-flex justify-content-start' id='Intro'>
                                <div className='bg-7DFE border-radius-25 lh-3 w-50 mt-4 text-center' role='button' onClick={()=>{window.location.replace('/art_intro');}}>
                                    Discover More
                                </div>
                            </div>
                        </div>
                        <div className='col position-relative row d-flex justify-content-center'>
                            <div className='w-75'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Rarebbit_Frame.png')} />
                            </div>
                            <div className='w-50 position-absolute top-50 start-50 rotate-5 rarebbit_intro' 
                                style={{
                                    transform: 'translate(-50%, -50%) rotate(5deg)'
                                }}>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Rarebbit_GIF.gif')} />
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Image_OneToken.png')} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <Ranking/>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5 text-white'>
                        {/* <div className=''>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Image_Get_it_now.png')} />
                        </div> */}
                        <div className='row d-flex justify-content-md-center mb-2'>
                            <div className='col col-lg-2'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Get_it_now_left.png')} />   
                            </div>
                            <div className='col col-md-auto display-5 font-TTB mt-auto mb-auto'>
                                Get it Now
                            </div>
                            <div className='col col-lg-2'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Get_it_now_right.png')} />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center fs-3 mb-2'>
                            Looking for the latest digital art? Register to get your token and transform<br />your uniqueness digital fashion art to your hoodie
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Image_Get_it_now.png')} />
                        </div>
                        {sessionStorage.getItem('token')?'':
                        <div className='d-flex justify-content-center'>
                            <div className='bg-7DFE border-radius-25 lh-3 w-50 mt-4 register_button' role='button' onClick={() => {passLogin(true)}}>
                                <span className='text-uppercase text-white'><b>SIGN UP</b> TO GET Our Generateive Art Collection</span>
                            </div>
                        </div>}
                    </div>
                    <div className='row d-flex justify-content-center text-white position-relative'>
                        <div className='row d-flex justify-content-center position-absolute display-5'>
                            <div style={{fontSize: '50px'}}>
                            Our <span className='font-TTB'>Hoodie</span>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center position-relative'>
                            <div className='col'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Our_Hoddie.png')} />
                            </div>
                            <div className='text-end position-absolute Our_Hoodie_first_item'>
                                <span className='text-uppercase position-absolute'>
                                    rose gold<br />metal snap button
                                </span>
                            </div>
                            <div className='text-end position-absolute Our_Hoodie_second_item'>
                                <span className='text-uppercase position-absolute'>
                                    <Link to='#Fabric' className='color-F91B'>sustainable fabric</Link>
                                </span>
                            </div>
                            <div className='text-end position-absolute Our_Hoodie_tirth_item'>
                                <span className='text-uppercase position-absolute'>
                                    100% vegan<br />leather tag
                                </span>
                            </div>
                            <div className='text-start position-absolute Our_Hoodie_fourth_item'>
                                <span className='text-uppercase position-absolute'>
                                    unique, one-of-a-kind<br /><a className='color-F91B' onClick={()=>{window.location.replace('/art_intro');}}><span>rarebbit graphic</span></a>
                                </span>
                            </div>
                            <div className='text-start position-absolute Our_Hoodie_fifth_item'>
                                <span className='text-uppercase position-absolute'>
                                    loose fit stylish cut
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pb-5 mb-5 mt-5'>
                        <div className='col position-relative' id='Fabric'>
                            <div className='position-absolute top-50 start-50 translate-middle w-100'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/p7.png')} />
                            </div>
                        </div>
                        <div className='col text-start text-white mt-3 ms-5 Intro_Area'>
                            <div className='display-5 Area_topic' >
                                Sustainable Fabric
                            </div>
                            <div className='fs-3 Area_content'>
                                By BCI Cotton X Bio Nylon Terry Cloth
                            </div>
                            <div className='mt-5 col col-sm-6'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/p7_txt.png')} />
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5'>
                        <div className='col d-flex m-auto'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/p8.png')} />
                        </div>
                        <div className='col text-start text-white mt-1 pt-1 ms-5 Intro_Area'>
                            <div className='display-5 mt-2 Area_topic'>
                                Bio-Nylon
                            </div>
                            <div className='fs-3 mt-3 Area_content'>
                                Plant-based Fiber
                            </div>
                            <div className='mt-3 w-80'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/p8_txt.png')} />
                            </div>
                            <div className='fs-4 mt-3 w-80 Area_content_content'>
                                Bio-Nylon is a new type of bio-based 
                                polyamide fiber. The main raw materials are 
                                derived from renewable resources such as 
                                industrial corn or natural fats and oils.
                            </div>
                        </div>
                    </div>

                    <div className='row d-flex justify-content-center pt-5 pb-5 mb-5 mt-5 position-relative'>
                        <div className='col text-start text-white mt-5 pt-5 BCI_Content'>
                            <div className='display-5 font-TT mt-3  pt-3 Area_topic'>
                                We Choose BCI Cotton
                            </div>
                            <div className='fs-4 mt-3 Area_content_content'>
                                The World’s Largest Cotton Sustainability 
                                Programme, aimed to help cotton communities 
                                survive and thrive, while protecting and restoring the 
                                environment
                            </div>
                            <div className='row mt-3' style={{marginLeft: '-25px'}}>
                                <img className='img-fluid' src={require('../Resources/Asset/images/BCI_Cotton_Image.png')} />
                            </div>
                        </div>
                        <div className='col d-flex m-auto'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/image_BCIcotton.png')} />
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

export default Main;
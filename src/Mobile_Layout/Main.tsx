import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components';

//Component
import Header from '../Mobile_Components/Header';
import Slidebar from '../Mobile_Components/Slidebar';
import Bottom from '../Mobile_Components/Bottom';
import MyMarquee from '../Components/MyMarquee';
import MyCarousel from '../Components/Carousel';
import Ranking from '../Mobile_Components/Ranking';

// DialogBox
import TokenBox from '../Mobile_Components/TokenBox';
import UserBox from '../Mobile_Components/UserBox';
import SpinImage from '../Mobile_Components/SpinImage';

//Resource
import BackgroundImage from '../Resources/Asset/images/background.png';

import fetch from '../Services/fetch';

// const StyledBurgerMenu = styled.div`
//     .bm-burger-button{
//         top: 25px;
//     }
// `;

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
                    <div className='col-2'>
                        {/* <StyledBurgerMenu> */}
                            <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget} />
                        {/* </StyledBurgerMenu> */}
                    </div>
                </div>
                <div className='container'>
                    <div className='row d-flex justify-content-center pt-3 mt-3'>
                        <div className='col w-100 position-relative d-flex justify-content-center pt-5 mt-5'>
                            <div className='w-100 d-flex justify-content-center'>
                                <div className='position-relative w-100'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/Image_back_light.png')}/>
                                </div>
                                <div className='top-50 start-50 position-absolute translate-middle center w-100'>
                                    <img className='img-fluid' src={require('../Resources/Asset/images/CNY-Hoodie-Red-with-graphic_diffusion.gif')}/>
                                </div>
                            </div>
                            <div className='w-75 top-50 start-50 position-absolute translate-middle center'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Image_THEMExSilkism.png')} />
                            </div>
                        </div>
                    </div>
            
                    <div className='row d-flex justify-content-center pt-5 mt-5'>
                        <div className='col d-flex justify-content-center position-relative' style={{minHeight: "300px"}}>
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
                                config={{ youtube : {playerVars: {disablekb: 1} }}}
                                />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-5 pt-5 text-white' >
                        <div className='fs-1 mb-3 font-TT'>
                            Introducing <span className='font-TTB'>Rarebbit</span>
                        </div>
                        <div className='position-relative row d-flex justify-content-center'>
                            <div className='w-75'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Rarebbit_Frame.png')} />
                            </div>
                            <div className='w-50 position-absolute top-50 start-50' 
                                style={{
                                    transform: 'translate(-50%, -50%) rotate(5deg)'
                                }}>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Rarebbit_GIF.gif')} />
                            </div>
                        </div>
                        <div className='fs-7 mt-3' id='Intro'>
                            <div className='font-TT'>
                                <div className='fs-5 text-uppercase font-TTB mb-3'><i>Rarebbit is Theme's first generative art collection.</i></div>
                                <p>Being the first member of Hands Up Crew. Each Rarebbit 
                                is generative by concept-software that works to produce 
                                unique, rare and <b className='text-uppercase font-TTB'>ONE-OF-A-KIND</b> digital fashion art.</p>
                                
                            </div>
                            <div className=' font-TT'>
                                Each Rarebbits have their own personalities and if you 
                                want to discover more, draw your own Rarebbit now by 
                                signing up on our website!
                            </div>
                            <div className='d-flex justify-content-center font-TTB'>
                                <div className='bg-7DFE border-radius-25 p-2 w-50 mt-3 text-center' role='button' onClick={()=>{window.location.replace('/art_intro');}}>
                                    Discover More
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-5 pt-5'>
                        <div className='col'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Image_OneToken.png')} />
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-5 pt-5'>
                        <Ranking/>
                    </div>
                    <div className='row d-flex justify-content-center text-white mt-5 pt-5'>
                        <div className='row d-flex justify-content-center mb-2'>
                            <div className='col m-auto p-0'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Get_it_now_left.png')} />   
                            </div>
                            <div className='col-6 fs-1 font-TT mt-auto mb-auto'>
                                Get It Now
                            </div>
                            <div className='col m-auto p-0'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Get_it_now_right.png')} />
                            </div>
                        </div>
                        <div className='text-center fs-7 mb-2'>
                            Looking for the latest digital art? Register to get your token and transform your uniqueness digital fashion art to your hoodie
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Image_Get_it_now.png')} />
                        </div>
                        {sessionStorage.getItem('token')?'':
                        <div className='d-flex justify-content-center'>
                            <div className='bg-7DFE border-radius-25 w-100 mt-4 fs-8 p-2' role='button' onClick={() => {passLogin(true)}}>
                                <span className='text-uppercase text-white'><b>SIGN UP</b> TO GET Our Generateive Art Collection</span>
                            </div>
                        </div>}
                    </div>
                    <div className='row d-flex justify-content-center text-white position-relative mt-5 pt-5'>
                        <div className='row d-flex justify-content-center fs-1 position-relative'>
                            <div className='fs-1 position-absolute' style={{marginTop: '-10px'}}>
                            Our <span className='font-TTB'>Hoodie</span>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center position-relative'>
                            <div className='col p-0'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Our_Hoddie.png')} />
                            </div>

                            <div className='text-center fs-9 position-absolute Our_Hoodie_first_item' >
                                <span className='text-uppercase position-absolute w-25' >
                                    rose gold<br />metal snap button
                                </span>
                            </div>
                            <div className='text-center fs-9 position-absolute Our_Hoodie_second_item' >
                                <span className='text-uppercase position-absolute w-25'>
                                    <Link to='#Fabric' className='color-F91B'>sustainable fabric</Link>
                                </span>
                            </div>
                            <div className='text-center fs-9 position-absolute Our_Hoodie_fourth_item'>
                                <span className='text-uppercase position-absolute w-25'>
                                    unique, <br /> one-of-<br />a-kind <br /><a className='color-F91B' onClick={()=>{window.location.href = '/art_intro';}}><span>rarebbit <br /> graphic</span></a>
                                </span>
                            </div>
                            
                             
                            <div className='text-center fs-9 position-absolute Our_Hoodie_tirth_item'>
                                <span className='text-uppercase position-absolute w-25'>
                                    100%<br /> vegan<br />leather <br />tag
                                </span>
                            </div>
                            
                            <div className='text-center fs-9 position-absolute Our_Hoodie_fifth_item'>
                                <span className='text-uppercase position-absolute w-25'>
                                    loose fit<br /> stylish cut
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className='row d-flex justify-content-start mt-5'>
                        <div className='position-relative' id='Fabric'>
                            <div className='w-100'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Bio_Nylon_Whole.png')} />
                            </div>
                        </div>
                        <div className='mt-3 fs-7 w-75 text-start text-white'>
                            Bio-Nylon is a new type of bio-based 
                            polyamide fiber. The main raw materials are 
                            derived from renewable resources such as 
                            industrial corn or natural fats and oils.
                        </div>
                    </div>
                    {/* <div className='row d-flex justify-content-center mt-3'>
                        <div className=''>
                            <img className='img-fluid' src={require('../Resources/Asset/images/p8.png')} />
                        </div>
                        <div className='text-start text-white mt-3'>
                            <div className='display-5'>
                                Bio-Nylon
                            </div>
                            <div className='fs-3 mt-3'>
                                Plant-based Fiber
                            </div>
                            <div className='mt-3 w-100'>
                                <img className='img-fluid' src={require('../Resources/Asset/images/p8_txt.png')} />
                            </div>
                            <div className='mt-3 fs-4 w-100'>
                                Bio- Nylon is a new type of bio-based 
                                polyamide fiber. The main raw material are 
                                derived from renewable resources such as 
                                industrial corn or natural fats and oils.
                            </div>
                        </div> 
                    </div>*/}

                    <div className='row d-flex justify-content-center position-relative mt-5 mb-5 pb-5'>
                        <div className=''>
                            <img className='img-fluid' src={require('../Resources/Asset/images/image_BCIcotton.png')} />
                        </div>
                        
                        <div className='text-white'>
                            <div className='fs-1 font-TT mt-3'>
                                We Choose BCI Cotton
                            </div>
                            <div className='fs-6 mt-3'>
                                The World’s Largest Cotton Sustainability 
                                Programme, aimed to help cotton communities 
                                survive and thrive, while protecting and restoring the 
                                environment
                            </div>
                        </div>

                        <div className='mt-3 mb-3'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/BCI_Cotton_Image.png')} />
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

export default Main;
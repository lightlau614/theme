import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { NavHashLink } from 'react-router-hash-link';

//Component
import Header from '../Components/Header';
import Slidebar from '../Components/Slidebar';
import Bottom from '../Components/Bottom';


// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

//Resource
import BackgroundImage from '../Resources/Asset/images/background.png';

const Rarebbit_box = (list:any) =>{

    return list.list && list.list.map((item:any)=>{

            return (
                <div key={item.id} className='col col-sm-4 mt-3 mb-3'>
                    <div className='position-relative mb-3'>
                        <div className=''>
                            <img className='img-fluid' src={item.bg} />
                        </div>
                        <div className='position-absolute top-0 start-0 translate-center p-5'>
                            <img className='img-fluid' src={item.src} />
                        </div>
                    </div>
                    <div className='text-white mb-3 fs-3 font-TTB'>
                        {item.Name}
                    </div>
                    <div className='text-white mb-3 fs-4' dangerouslySetInnerHTML={{ __html: item.Content }} />
                </div>    
            )

        }
    )
}

const imageAPI = '../Resources/Asset/images/';

const Art_Intro = () => {

    const navigate = useNavigate();

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');

    const rarebbit_data = [
        {
            id:'1',
            src: require('../Resources/Asset/images/Creami.png'),
            bg: require('../Resources/Asset/images/Creami_bg.png'),
            Name: 'Creami',
            Content: `Representing Pure, Minimalism Creami\'s a clean freak<br />Love creamy coffee<br />Keeping Village R clean`
        },
        {
            id:'2',
            src: require('../Resources/Asset/images/Sunni.png'),
            bg: require('../Resources/Asset/images/Sunni_bg.png'),
            Name: 'Sunni',
            Content: `Representing Happiness, Sunshine<br />Share happiness<br />Love sunbath<br />Recording happy moments in Village R`
        },
        {
            id:'3',
            src: require('../Resources/Asset/images/Greeni.png'),
            bg: require('../Resources/Asset/images/Greeni_bg.png'),
            Name: 'Greeni',
            Content: `Representing wellness, eco-friendly<br />Care about nature and sustainability of Village R<br />Responsible to the recycling & green business in Village R`
        },
        {
            id:'4',
            src: require('../Resources/Asset/images/Funki.png'),
            bg: require('../Resources/Asset/images/Funki_bg.png'),
            Name: 'Funki',
            Content: `Representing Playful,<br />Party Animal<br />Love street culture<br />Held parties & social activities in Village R`
        },
        {
            id:'5',
            src: require('../Resources/Asset/images/DrR.png'),
            bg: require('../Resources/Asset/images/DrR_bg.png'),
            Name: 'Dr. R',
            Content: `Representing Intelligent<br />The big boss in Village R<br />Love reading books<br />Held Lecture in Village R School`
        },
        {
            id:'6',
            src: require('../Resources/Asset/images/Rainbow.png'),
            bg: require('../Resources/Asset/images/Rainbow_bg.png'),
            Name: 'Rainbow',
            Content: `Representing Love & leftards<br />LGBT and Genderless supporter<br />Spreading love & peace culture in Village R`
        },
        {
            id:'7',
            src: require('../Resources/Asset/images/Milki.png'),
            bg: require('../Resources/Asset/images/Milki_bg.png'),
            Name: 'Milki',
            Content: `Representing Hard-Working,<br />Love nature and outdoor<br />Milkis are farmers and responsible to supply crops to the whole Villiage R`
        },
        {
            id:'8',
            src: require('../Resources/Asset/images/Tiggi.png'),
            bg: require('../Resources/Asset/images/Tiggi_bg.png'),
            Name: 'Tiggi',
            Content: `Representing Shy & Quiet,<br />Love eating fast food<br />Other rarebitts always thought TIGGI are tigers but they are just rabbit`
        },
        {
            id:'9',
            src: require('../Resources/Asset/images/Candi.png'),
            bg: require('../Resources/Asset/images/Candi_bg.png'),
            Name: 'Candi',
            Content: `Representing Cute & Caring<br />Eating sweets all day long<br />Responsible for all the snacks supply in Village R`
        },
        {
            id:'10',
            src: require('../Resources/Asset/images/U-NI.png'),
            bg: require('../Resources/Asset/images/Uni_bg.png'),
            Name: 'U-Ni',
            Content: `Representing Hope & Dream<br />
            Love day-dreaming <br />
            Representing Mental therapist <br />
            Responsible to heal other rarebbits
            `
        },
        {
            id:'11',
            src: require('../Resources/Asset/images/Lucki.png'),
            bg: require('../Resources/Asset/images/Lucki_bg.png'),
            Name: 'Creami',
            Content: `Representing Happy & Cheerful,<br />
            Love Chinese Culture <br />
            Love to cook and share with others Rarebbits<br />
            Love to invite guests
            `
        }
        
    ];
   
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
                    <div>
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget} />
                    </div>
                </div>
                <div className='container position-relative'>
                    <NavHashLink to='/collection#Intro'>
                        <div className='position-absolute left-0 text-white fs-4' role='button'>
                            <IoIosArrowBack /> <span className='fs-5 lh-1'> Back </span>
                        </div>
                    </NavHashLink>
                    <div className='row d-flex justify-content-center text-white mt-3 mb-3'>
                        <div className='display-5 font-TTB mt-3 mb-4'>
                            Rarebbit
                        </div>
                        <div className='fs-4 lh-lg'>
                            Once upon a time in Hands Up Meta, there were <b className='font-TTB'>1000 Rarebbits </b>  
                            generated by concept-software that works to produce unique and one-of-a-kind digital fashion art. 
                            Those Rarebbits were found in Village R and they have their specific role to maintain order and 
                            spread love & peace in Village R.
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center mt-2 mb-2'>
                        <Rarebbit_box list={rarebbit_data}/>
                    </div>
                    <div className='d-flex justify-content-center mt-2 mb-2'>
                        <NavHashLink to='/collection#Intro' className='row d-flex justify-content-center w-25 text-decoration-none'>
                            <div className='bg-F91B border-radius-25 lh-3 mt-2 mb-2' role='button'>
                                <span className='text-uppercase text-white'>Back</span>
                            </div>
                        </NavHashLink>
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

export default Art_Intro;
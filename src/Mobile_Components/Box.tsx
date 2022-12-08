import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

import TokenBox from '../Mobile_Components/TokenBox';
import SpinImage from '../Mobile_Components/SpinImage';

import fetch from '../Services/fetch';

interface Props{
    info: Object[];
    reload: Function;
    passTrans: Function;
}

const imageAPI = "http://api.theme.com.hk/download/?name=";
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const Box = ( info: Props ) => {

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ drawImage, setDrawImage ] = useState<any>('');

    const navigate = useNavigate();

    const pathname = window.location.pathname;

    const [ dataframe, setDataFrame ] = useState<any>('');

    const map_data = (e:any) => {
        setDataFrame(e);
    }

    const handleClick = (e:any) => {
        window.location.href = '/product/Hoodie/' + e ;
    }

    const handleLike = (e:any, item:any) =>{
        fetch.like(sessionStorage.getItem('token'), item.nft_id);
        console.log(e.target.class);
        if (e.target.getAttribute('class')==="1"){
            e.target.setAttribute("src", require('../Resources/Asset/images/Blank_Heart.png'));
            e.target.setAttribute("class", "0");
        }
        else{
            e.target.setAttribute("src", require('../Resources/Asset/images/Liked_Heart.png'));
            e.target.setAttribute("class", "1");
        }

    }

    const handleSend = (e:any) => {
        info.passTrans(e)
    }

    const handledownload = (e:any) =>{
        saveAs(e, 'image.png');
    };

    const updata = () => {
        if(Object.keys(info.info).length > 0){
            map_data(info.info);
        }
    }

    const handleToken = async ( event:any ) => {
        passToken(true);
      }

    const handleArtIntro = (e:any) => {
        window.location.href='/gallery/' + e;
    }

    const passToken = async ( item:any ) =>{
        setOpenToken(item);
        setOpenLogin(false);
        setOpenDraw(false);
    }

    const passLogin = async (item:any) => {
        setOpenLogin(item);
        setOpenToken(false);
        setOpenDraw(false);
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
    }

    useEffect(()=>{
        updata();
    },[info])

    return (
        <>
            <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
            <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />

            {dataframe? dataframe && dataframe.map((item:any, index:any)=>{

                const id_char_length = 6;
                var display_id = '#';
                if(item.nft_id !== null){
                    for (let x = 1; x < id_char_length - item.nft_id.toString().length; x++ ){
                        display_id = display_id + '0';
                    }

                    display_id = display_id + item.nft_id.toString();
                }

                var enableShare = false;

                var temp_date = '';
                var nowdate = new Date();

                if (item.Share_Date !== null) {
                    if ( item.Accept_Date === null) {
                        
                        temp_date = item.Share_Date.split('T');
                        var data_date = temp_date[0].split('-');
                        var date = new Date(data_date[0]+'/'+data_date[1]+'/'+data_date[2]);

                        let date_1 = Math.floor(new Date(date).getTime());
                        let date_2 = Math.floor(new Date(nowdate).getTime());
                        let difference =  date_2 - date_1;

                        let result = Math.ceil(difference / ( 1000*3600 * 24 ) - 1);

                        if (result < 3){
                            enableShare = false;
                        }else{
                            enableShare = true
                        }
                    }else{
                        enableShare = true;
                    }
                }else{
                    enableShare = true;
                }

                return (
                    <>
                        {item.nft_id !== null?
                        (
                        <>
                            <div 
                                className={ (pathname === '/me')?
                                        'col-6 col-sm-12 col-md-3 col-lg-2 p-1 '
                                    
                                :
                                        'col col-sm-12 col-md-3 col-lg-2 p-1 m-1'
                                }
                                style={{borderRadius: pathname!== '/me'? '25px': '', border : pathname !== '/me'? '2px solid #7D75FE':''}}>
                                <div className='d-flex justify-content-center position-relative'>
                                    <div className='m-1'>
                                        
                                            <>
                                            {item.User_Id !== null?
                                                // <div className='p-2' style={{borderRadius: '25px', border : '2px solid #7D75FE'}} onClick={()=>{window.location.replace('http://'+ window.location.host +'/gallery/'+item.nft_id)}}>
                                                <div className='p-2' style={{borderRadius: '25px', border : '2px solid #7D75FE'}} onClick={()=>{handleArtIntro(item.nft_id)}} >
                                                    <img src={imageAPI + item.ImageSrc} className='img-fluid'/>
                                                </div>
                                            :
                                                // <div className='p-2' onClick={()=>{window.location.replace('http://'+ window.location.host +'/gallery/'+item.nft_id)}}>
                                                <div className='p-2' onClick={()=>{handleArtIntro(item.nft_id)}}>
                                                    <img className='img-fluid' src={require('../Resources/Asset/images/Blindbox_image.png')} />
                                                </div>
                                            }
                                            </>
                                        
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col fs-4 font-TTB text-start'>
                                        {/* # {item.nft_id} */}
                                        {display_id}
                                    </div>
                                    <div className='col'>
                                    {pathname === '/me' && sessionStorage.getItem('token')?
                                    (
                                        <>
                                            <div className='like-size float-end' role={'button'} onClick={()=>{handledownload(imageAPI + item.ImageSrc)}}>
                                                <img className='img-fluid' src={require('../Resources/Asset/images/download.png')} />
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            {sessionStorage.getItem('token')&&item.User_Id?
                                                (
                                                    <>
                                                        <div className='like-size float-end' onClick={(e)=>handleLike(e, item)}>
                                                            <img className={`${item.liked}`} src={item.liked?require('../Resources/Asset/images/Liked_Heart.png'):require('../Resources/Asset/images/Blank_Heart.png')} />
                                                        </div>
                                                    </>
                                                )
                                            :''}
                                        </>
                                    )}
                                    </div>
                                </div>
                                <div className='row fs-6 font-TT'>
                                    <div className='col text-start'>
                                        Mys<span>t</span>ery Box:
                                    </div>
                                </div>
                                <div className='row fs-6 font-TT '>
                                    <div className='col text-start'>
                                        Generate Art
                                    </div>
                                </div>
                                {pathname === '/me' && sessionStorage.getItem('token')?
                                    (
                                        <>
                                            {item.Order_Id === null?
                                            (
                                                <>
                                                     { enableShare === true? 
                                                    (
                                                        <>
                                                            {item.DisableOrder === 0?
                                                            (
                                                                <>
                                                                    <div className='row d-flex justify-content-center fs-6 font-TT '>
                                                                        <div className='col col-sm-10 text-middle bg-F91B text-white mt-1 mb-1 p-2' style={{borderRadius: '25px'}} role={'button'} onClick={ () => { handleClick(item.nft_id) }}>
                                                                            Cus<span>t</span>omise Hoodie
                                                                        </div>
                                                                    </div>
                                                                
                                                                    <div className='row d-flex justify-content-center fs-6 font-TT '>
                                                                        <div className='col col-sm-10 text-middle bg-7DFE text-white mt-1 mb-1 p-2' style={{borderRadius: '25px'}} role={'button'} onClick={()=>{handleSend(item.nft_id)}}>
                                                                            Send As Gift
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ):(
                                                                <>
                                                                    <div className='row d-flex justify-content-center fs-6 font-TT '>
                                                                        <div className='col col-sm-10 text-middle bg-9390 text-white mt-1 mb-1 p-2' style={{borderRadius: '25px'}} role={'button'} >
                                                                            Cus<span>t</span>omised Hoodie
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    ) :''}
                                                </>
                                            ):(
                                                <>
                                                    <div className='row d-flex justify-content-center fs-6 font-TT '>
                                                        <div className='col col-sm-10 text-middle bg-9390 text-white mt-1 mb-1 p-2' style={{borderRadius: '25px'}} role={'button'} >
                                                            Cus<span>t</span>omised Hoodie
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )
                                :''}
                            </div>
                        </>):
                        <>
                            <div className='row d-flex justify-content-center fs-4 font-TT pt-5 mt-5'>
                                <div className=''>
                                    You don't have any Rarebbit. Please Redeem Token
                                </div>
                                <div className='w-50 text-center bg-F91B border-radius-25 mt-5'>
                                    <div className='m-auto mt-2 mb-2 lh-1 text-white font-TT' role={'button'} onClick={handleToken}>Redeem</div>
                                </div>
                            </div>
                        </>}
                    </>)}):''}
        </>
    )
};

export default Box;
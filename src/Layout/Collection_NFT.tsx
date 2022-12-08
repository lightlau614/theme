import React, { useState, useEffect} from 'react';
import styled from 'styled-components'
import { useParams } from "react-router-dom";

// Component
import Collection_Header from '../Components/Collection_Header';
import Slidebar from '../Components/Slidebar';
import Collection_Bottom from '../Components/Collection_Bottom';
import Collection_NFT_Info from '../Components/Collection_NFT_Info';

// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

//Services
import fetch from '../Services/fetch';

const StyledBurgerMenu = styled.div`
    .bm-burger-button{
        top: 25px;
    }
`;

const Collection_NFT = () => {

    const param = useParams();

    const nftId = param.id;

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');
    const [ rawData, setRawData ] = useState<any>([])
    const [ sort, setSort ] = useState<any>('');
    const [ datalength, setDataLength ] = useState<any>('0');

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

    const handleGoCollection = () => {
        window.location.href = '/Collection';
    }

    const loadAllNFT = () => {
        fetch.fetchAllNFT()
            .then((response:any)=>{
                if(response.statusCode === 200){
                    setRawData(response.body.data);
                    setDataLength(response.body.data.length);
                }else{
                    if(response.statusCode === 401){
                        sessionStorage.removeItem('token');
                        window.location.reload();
                    }
                }
            })
    }

    useEffect(()=>{
        loadAllNFT();
    },[]);

    return (
        <>
            <SpinImage openDraw={openDraw} passDraw={passDraw} drawImage={drawImage} />
            <TokenBox openToken={openToken} passToken={passToken} passDraw={passDraw} />
            <UserBox openLogin={openLogin} passLogin={passLogin} getForget={ getForget }/>
            <div className='row d-flex bg-7DFE'>
                <Collection_Header />
                <div className='col-lg-1 p-2'>
                    {/* <StyledBurgerMenu> */}
                        <Slidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} passToken={passToken} passLogin={passLogin} getForget={getForget}/>
                    {/* </StyledBurgerMenu> */}
                </div>
            </div>
            <div className='container'>  
                <div className='row lh-3 fs-5 d-flex justify-content-center'>
                        <div className='container row ps-5 pe-5'>
                            <div className='col text-start'>
                                <span className='font-TT'><span role='button' onClick={handleGoCollection}>Collection</span> / </span><span className='font-QSB'>Theme & Silkism</span>
                            </div>
                            <div className='col-lg-2 text-end'>
                                {datalength} Items
                            </div>
                        </div>
                    </div>

                {/* <div className='row lh-3 fs-5'>
                    <div className='container row'>
                        <div className='col text-start'>
                            <span className='font-TT'>Collection / </span><span className='font-QSB'>Theme & Silkism</span>
                        </div>
                        <div className='col-lg-2 text-end'>
                            {datalength} Items
                        </div>
                    </div>
                </div>*/}
                <div className='row'>
                    <Collection_NFT_Info info={nftId} rawData={rawData} reload={loadAllNFT} passLogin={passLogin} />
                </div> 
            </div>
            
            <Collection_Bottom />
            
        </>
    );
};

export default Collection_NFT;
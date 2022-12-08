import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Pagination } from '@mui/material';

//Component
import Box from '../Components/Box';
import Collection_Header from '../Components/Collection_Header';
import Slidebar from '../Components/Slidebar';
import Collection_Bottom from '../Components/Collection_Bottom';

// DialogBox
import TokenBox from '../Components/TokenBox';
import UserBox from '../Components/UserBox';
import SpinImage from '../Components/SpinImage';

//Services
import fetch from '../Services/fetch';
import TransferBox from '../Components/TransferBox';

const StyledBurgerMenu = styled.div`
    .bm-burger-button{
        top: 25px;
    }
`;

const MyProfile = () => {

    const param = useParams();

    const pathname = window.location.pathname;

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ openTrans, setOpenTrans ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');
    const [ rawData, setRawData ] = useState<any>([]);
    const [ datalength, setDataLength ] = useState<any>(0);
    const [ pagination, setPagination ] = useState<any>(1);
    const [ total, setTotal ] = useState<any>(0);
    const [ startRecord, setStartRecord ] = useState<any>(0);
    const [ showRecord, setShowRecord ] = useState<any>(30);
    const [ displayRecord, setDisplayRecord] = useState<any>([]);
    const [ transdata, setTransData ] = useState<any>({})

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

    const passTrans = async (item:any) => {
        setTransData(displayRecord.filter((newVal:any) => {
            return newVal.nft_id === Number(item);
        }));
        setOpenTrans(item);
    }

    const handlePageChange = (e:React.ChangeEvent<unknown>, value: number) =>{
        setPagination(value);
    }

    const handleGoHome = () => {
        window.location.href = '/collection';
    }

    const AscData = (e:any) => {
        e.sort((a:any, b:any)=>{
            return Number(a.nft_id) < Number(b.nft_id) ? -1 : 1;
        });
        setDisplayRecord(e.slice(startRecord,showRecord));
    }

    const getOwn = () =>{
        fetch.fetchNFT(sessionStorage.getItem('token'))
            .then((response:any)=>{
                if(response.statusCode === 200){
                    setRawData(response.body.data);
                    // setDisplayRecord(response.body.data.slice(startRecord,showRecord));
                    AscData(response.body.data);
                    if(response.body.data.length > 0){
                        if(response.body.data.length < 2){
                            if(response.body.data[0].nft_id !== null) {
                                setDataLength(response.body.data.length);
                            }else{
                                setDataLength(0);
                            }
                        }else{
                            setDataLength(response.body.data.length);
                        }
                    }
                    
                    if(Math.round(response.body.data.length % showRecord) > 1){
                        setTotal(Math.floor(response.body.data.length / 30) + 1);
                    }else{
                        setTotal(Math.floor(response.body.data.length / 30));
                    }
                }
        });
    }

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            getOwn();
        }
        if(!sessionStorage.getItem('token')){
            window.location.replace('/collection');
        }
    },[])

    useEffect(()=>{
        if(pagination===1){
            setDisplayRecord(rawData.slice(startRecord,showRecord));
        }else{
            setDisplayRecord(rawData.slice(( showRecord * pagination ) + 1, ( showRecord * ( pagination + 1 ))));
        }
    },[pagination]);
    
    return (
        <>
            <TransferBox data={transdata} openTrans={openTrans} passTrans={passTrans}/>
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
                            <span className='font-TT'><span role='button' onClick={handleGoHome}>Home</span> / </span><span className='font-QSB'>Collaboration</span>
                        </div>
                        <div className='col col-md-auto'>
                            {datalength} Items
                        </div>
                    </div>
                </div>
                <div className='row display-5'>
                    <div className='col text-start'>
                        <div className='container row ps-5 pe-5'>
                            <div className='col text-start'>
                                <span className='font-TTB color-7DFE'>My Profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                        <Box info={displayRecord} reload={getOwn} passTrans={passTrans}/>
                </div>
                <div className='row'>
                    <div className='col d-flex justify-content-center'>
                        {total > 1 ?<Pagination count={total} page={pagination} onChange={handlePageChange} />:''}
                    </div>
                </div>
            </div>
            
            <Collection_Bottom />
        </>
    );
};

export default MyProfile;
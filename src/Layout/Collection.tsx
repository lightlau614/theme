import React, { useState, useEffect} from 'react';
import { Select, MenuItem, InputLabel, SelectChangeEvent, FormControl, Pagination } from '@mui/material';
import styled from 'styled-components'

//Components
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

const StyledBurgerMenu = styled.div`
    .bm-burger-button{
        top: 25px;
    }
`;

const Collection = () => {
    
    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');
    const [ rawData, setRawData ] = useState<any>([]);
    const [ sort, setSort ] = useState<any>('');
    const [ datalength, setDataLength ] = useState<any>(0);
    const [ pagination, setPagination ] = useState<any>(1);
    const [ total, setTotal ] = useState<any>(0);
    const [ startRecord, setStartRecord ] = useState<any>(0);
    const [ showRecord, setShowRecord ] = useState<any>(30);
    const [ displayRecord, setDisplayRecord] = useState<any>([]);

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

    const handlePageChange = (e:React.ChangeEvent<unknown>, value: number) =>{
        setPagination(value);
    }

    const loadAllNFT = () =>{
        fetch.fetchAllNFT()
            .then((response:any)=>{
                if(response.statusCode === 200){
                    setRawData(response.body.data);
                    // setDisplayRecord(response.body.data)
                    setDisplayRecord(response.body.data.slice(startRecord,showRecord));
                    setDataLength(response.body.data.length);
                    if(Math.round(response.body.data.length % showRecord) > 1){
                        setTotal(Math.floor(response.body.data.length / 30) + 1);
                    }else{
                        setTotal(Math.floor(response.body.data.length / 30));
                    }
                }else{
                    if(response.statusCode === 401){
                        sessionStorage.removeItem('token');
                        window.location.reload();
                    }
                }
            })
    }

    const handleChange = (e:SelectChangeEvent) =>{
        setSort(e.target.value);
        SortData(e.target.value);
    }

    const SortData = (e:any) => {
        
        if(e === 2){

             rawData.sort((a:any, b:any)=>{
                
                if (a.User_Id === null || a.User_Id === undefined ){
                    
                    return 1
                }

                if(b.User_Id === null || b.User_Id === undefined){
                    return -1
                }

                return Number(a.nft_id) < Number(b.nft_id)? -1: 1;
            });

            passData(rawData);

        } else if (e === 1) {

            rawData.sort((a:any, b:any)=>{
                
                if (a.User_Id !== null) {
                    return 1
                }

                if (b.User_Id !== null) {
                    return -1
                }

                return Number(a.nft_id) < Number(b.nft_id)? -1: 1;
            });

            passData(rawData);

        } else {
            
            rawData.sort((a:any, b:any)=>{
                return Number(a.nft_id) < Number(b.nft_id)? -1 : 1;
            });
            passData(rawData);
        }
    }

    const passData = (e:any)=>{
        let temp = e;
        if(pagination===1){
            setDisplayRecord(temp.slice(startRecord,showRecord));

        }else{
            setDisplayRecord(temp.slice(( showRecord * (pagination  - 1)), ( showRecord * pagination)));
        }
    }

    const handleGoCollection = () => {
        window.location.href = '/Collection';
    }
        
    useEffect(()=>{
        loadAllNFT();
    },[]);

    useEffect(()=>{
        if(pagination===1){
            setDisplayRecord(rawData.slice(startRecord,showRecord));
        }else{
            setDisplayRecord(rawData.slice(( showRecord * (pagination  - 1)), ( showRecord * pagination)));
        }
    },[pagination]);

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
                        <div className='col col-lg-auto text-end'>
                            <div className='row'>
                                <div className='col col-md-auto'>
                                    <FormControl sx={{ m: 1, minWidth: 80}} size='small' variant='standard'>
                                        <InputLabel id="select-label">Sort</InputLabel>
                                        <Select
                                            value={sort}
                                            onChange={handleChange}
                                            autoWidth
                                            label="Sort"
                                        >
                                            <MenuItem value={2}>
                                                Open
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                unOpen
                                            </MenuItem>
                                            <MenuItem value={0}>
                                                Default
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='col col-md-auto'>
                                    {datalength} Items
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <Box info={displayRecord} reload={loadAllNFT} passTrans={()=>{}}/>
                </div>
                <div className='row mt-3 pt-3 mb-5 pb-5'>
                    <div className='col d-flex justify-content-center'>
                        <Pagination count={total} page={pagination} onChange={handlePageChange} />
                    </div>
                </div>
            </div>
            
            <Collection_Bottom />
            <div className='position-fixed end-0 bottom-0 mt-0 ms-0 me-5 mb-5 p-0 w-100 d-flex justify-content-end'>
                <div role='button' onClick={()=>{window.scrollTo({top: 0})}}>
                    <img className='img-fiuld' src={require('../Resources/Asset/images/image_down_orange.png')} />
                </div>
            </div>
        </>
    );
};

export default Collection;
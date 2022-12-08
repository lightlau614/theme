import React, { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem, FormControl, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { CloseButton } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components'

//Component
import Slidebar from '../Mobile_Components/Slidebar';
import Collection_Header from '../Mobile_Components/Collection_Header';
import Collection_Bottom from '../Mobile_Components/Collection_Bottom';

//Dialogbox
import OrderBox from '../Mobile_Components/OrderBox';
import TokenBox from '../Mobile_Components/TokenBox';
import UserBox from '../Mobile_Components/UserBox';
import SpinImage from '../Mobile_Components/SpinImage';

//Services
import fetch from '../Services/fetch';

const imageAPI = "http://api.theme.com.hk/download/?name=";
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const CustomSelect = styled(Select)(() => ({
    "&.MuiOutlinedInput-root":{
        "& fieldset": {
            border: "2px solid #7D75FE",
            borderRadius: '25px'
        }
    }
}))

const StyledBurgerMenu = styled.div`
    .bm-burger-bars{
    background: #F9A01B;
    }
`;

const SizeBox = ( e:any ) => {

    const [ boxopen, setBoxOpen ] = useState<boolean>(false);
    
    const handleClose = () =>{
        setBoxOpen(false);
        e.openInfor(false);
    }

    useEffect(()=>{
        if(e.openSize === true){
            setBoxOpen(e.openSize);
        }
    },[e])

    return (
        <>
            <Dialog
                open={boxopen}
                onClose={handleClose}
                maxWidth={'lg'}
            >
                <DialogContent>
                    <DialogContentText className='text-center'>
                        <div className='position-relative w-100 mw-100'>
                            <div className='position-absolute w-100'>
                                <div className='fs-6 text-end' role='button' onClick={handleClose}>
                                    <CloseButton onClick={handleClose}/>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center color-F91B display-5'>
                                <div className='col col-lg-auto'>
                                    Size Guide
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center color-F91B'>
                            <img className='img-fluid' src={require('../Resources/Asset/images/Mobile_Size_Chart.png')} />
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

const ProductSelling = () => {
    
    const param = useParams();
    const navigate = useNavigate();

    let product_item = param.item;

    const [ openToken, setOpenToken ] = useState<boolean>(false);
    const [ openLogin, setOpenLogin ] = useState<boolean>(false);
    const [ openDraw, setOpenDraw ] = useState<boolean>(false);
    const [ openorder, setOpenOrder ] = useState<boolean>(false);
    const [ size, setSize ] = useState<boolean>(false);
    const [ getForget, setGetForget ] = useState<any>('');
    const [ drawImage, setDrawImage ] = useState<any>('');
    const [ priceRemark, setPriceRemark ] = useState<any>('');
    
    const [ imgSrc, setImgSrc ] = useState<any>('');
    const [ iconEnable, setIconEnable ] = useState<boolean>(true);
    const [ clothSize, setClothSize ] = useState<any>('S/M');
    const [ selectColor, setSelectColor ] = useState<any>('');
    const [ clothColor, setClothColor ] = useState<any>({});
    const [ remark, setRemark ] = useState<any>('');
    const [ price, setPrice ] = useState<any>('');
    const choiceColor = [{color: '', code: ''}];
    const imglistTemp : any[] = [];
    const gotnft : any[] = [];
    const [ imglist, setImglist ] = useState<any>({});
    const [ colorcode, setColorCode ] = useState<any>('');
    const [ nft, setNFT ] = useState<any>({});
    const [ pronft, setProNFT ] = useState<any>('');
    const [ orderNum, setOrderNum ] = useState<any>('');
    const [rowData, setRowData] = useState<any>({});

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

    const passOrder = async (item:any) =>{
        setOpenOrder(item)
    }

    const handleMouseOver = (e:any) => {
        setImgSrc(e.target.src);
        if(e.target.attributes.getNamedItem('data-key').value === '0'){
            imgEn(true);
        }else{
            imgEn(false);
        }
    }

    const handleSubmit = () => {

        let img = nft[0].img.split('=');
         
        let param = {
            nft_id: pronft,
            nft: img[1],
            color: selectColor,
            size: clothSize,
            remark: remark,
        }

        fetch.payOrder(param).then(
            (response:any)=>{
                if(response.statusCode === 200){
                    passOrder(true);
                    setOrderNum(response.body.data.Order);
                }
            }
        );
    }

    async function imgEn ( params:any ){
        setTimeout(()=>{
            setIconEnable(params);
        }, 100)
    }

    const getItem = (e:any) => {
        fetch.fetchItem(product_item).then(
            (response:any) => {
                if(response.statusCode === 200){
                    setRowData(response.body.data);
                    for( let x = 0; x < response.body.data.length; x++){
                        if(choiceColor[0].color ===''){
                            choiceColor[0] = {
                                color: response.body.data[x].Color,
                                code: response.body.data[x].html_code
                            }
                        }else{
                            let check = false;
                            for (let y = 0; y < choiceColor.length; y++){
                                if(choiceColor[y].color === response.body.data[x].Color){
                                    check = true;
                                }
                            }

                            if(check === false){
                                choiceColor.push({
                                    color: response.body.data[x].Color,
                                    code: response.body.data[x].html_code
                                });
                            }
                            
                        }
                        
                    }
                    
                    setPriceRemark(response.body.data[0].Price_Remark);
                    setClothColor(choiceColor);

                }
            },
            (error:any) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString;
                // setMessage(resMessage);
            }
        )
    }

    const getNFT = () =>{
        fetch.fetchNFT(sessionStorage.getItem('token'))
            .then((response:any)=>{
                if(response.statusCode === 200){
                    response.body.data.map((item:any, index:any)=>{
                        if(item.nft_id === Number(param.nft)){
                            setProNFT(item.nft_id);
                            const id_char_length = 6;
                            var display_id = '#';

                            for (let x = 1; x < id_char_length - item.nft_id.toString().length; x++ ){
                                display_id = display_id + '0';
                            }

                            display_id = display_id + item.nft_id.toString();

                            let nftimg = {
                                id: display_id,
                                img: imageAPI + item.ImageSrc
                            }

                            if(gotnft.length === 0){
                                gotnft.push(nftimg);
                            }
                        }
                    })
                    setNFT(gotnft);
                }
            });
    }

    const getOrder = () => {
        fetch.fetchOrder(param.nft)
            .then((response:any)=>{
                if(response.statusCode === 200){
                    if(response.body.data.Order !== null ){
                        window.location.href = '/collection';
                    }
                }
            });
    }

    const openInfor = (e:any) => {
        setSize(e);
    }

    useEffect(()=>{
        if(product_item !== ''){
            getItem(product_item);
            getNFT();
            getOrder();
        }
        if(!sessionStorage.getItem('token')){
            window.location.replace('/collection');
        }
    },[]);

    useEffect(()=>{
        if(clothColor.length > 0){
            let select_var = clothColor[0].color;
            let select_code = clothColor[0].code;
            setColorCode(select_code);
            setSelectColor(select_var);
            for(let x = 0; x < Object.values(rowData).length; x++){
                if(rowData[x].Color === select_var){
                    if(!imglistTemp.includes(rowData[x].link)){
                        imglistTemp.push(imageAPI+ rowData[x].link);
                    }
                    setPrice(rowData[x].Price);
                }
            }
            setImgSrc(imglistTemp[0]);
            setImglist(imglistTemp);
        }
    },[clothColor]);

    useEffect(()=>{
        for(let x = 0; x < Object.values(rowData).length; x++){
            if(rowData[x].Color === selectColor){
                if(!imglistTemp.includes(rowData[x].link)){
                    imglistTemp.push(imageAPI+ rowData[x].link);
                    setPrice(rowData[x].Price);
                }
            }
        }
        setImgSrc(imglistTemp[0]);
        setImglist(imglistTemp);
    },[selectColor])
    
    return (
        <>
            <SizeBox openSize={size} openInfor={openInfor}/>
            <OrderBox openOrder={openorder} orderNum={orderNum} passOrder={passOrder} />
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
                <div className='row mt-5 '>
                    <div className='col-12 col-md-auto col-lg-8'>
                        <div className='row'>
                            <div className='col-12 col-sm-12 col-md-9 col-lg-9 d-flex justify-content-center'>
                                <div className='cart_product_preview position-relative w-100'>
                                    <div>
                                        <img className='img-fiuld' src={imgSrc} />
                                    </div>
                                    {iconEnable?
                                    (   
                                        Object.values(nft).map((item:any, index:any)=> {
                                            return (
                                                <>
                                                    <div className='hoodie_black_icon'>
                                                        <img className='img-fiuld' key={item.id} src={item.img} />
                                                    </div>
                                                </>
                                            )})
                                    ):''}
                                </div>
                            </div>
                            <div className='col col-md-12 col-lg-3'>
                                <div className='w-100 col-12 row'>
                                    {Object.values(imglist).map((item:any, index:any) => {
                                        return (
                                            <>
                                                <div className='preview-sm-pic col-4 col-md-4 col-lg-auto'>
                                                    <img className='img-fiuld' data-key={index} src={item} onMouseMove={handleMouseOver} />
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col col-md-0 col-lg-4'>
                        <div className='row'>
                            <div className='col fs-3 font-TT text-start'>
                                    Theme x Silkism
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col fs-3 font-TTB text-start'>
                                    Hoodie
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col fs-4 text-start'>
                                HKD$ {price} {priceRemark}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='row'>
                            {Object.values(clothColor).map((item:any, index:any)=> {
                                return (
                                    <>
                                        {index && index===0?setSelectColor(item.color):null}
                                        <div className='col-1 col-sm-1 pt-2 ps-0 pe-0 d-flex justify-content-start'>
                                            <div className='circle position-relative' 
                                                style={{
                                                    border : colorcode === item.code? "2px solid #7D75FE": '', 
                                                    width: "30px", 
                                                    height: "30px"
                                                }}>
                                                <div className='circle position-absolute top-50 start-50 translate-middle' style={{backgroundColor: item.code}} onClick={(e)=>{
                                                    setColorCode(item.code);
                                                    setSelectColor(item.color);
                                                    setIconEnable(true);
                                                }}>
                                                    <span className='display-none'>{item.color}</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </>
                                )
                            })}
                                    <div className='col col-sm-10 text-end lh-3'>
                                        <div className='row'>
                                            <div className='col col-sm-6 col-md-6 col-lg-6 text-start' style={{padding: 'unset'}}>
                                                {colorcode? selectColor:''}
                                            </div>
                                            <div className='col col-sm-6 col-md-6 col-lg-6 text-decoration-underline' role='button' onClick={()=>{openInfor(true)}}>
                                                Size Guide
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <FormControl sx={{ m: 1, width: '100%',  marginLeft: "unset", marginRight: "unset"}}
                                >
                                    <InputLabel id='select-label'>Select Size</InputLabel>
                                    <CustomSelect
                                        value={clothSize}
                                        onChange={ (e) => setClothSize(e.target.value)}
                                        label='Select Size'
                                        MenuProps={{
                                            PaperProps: { sx: {
                                                borderRadius: '25px',
                                            }}
                                        }}
                                    >
                                        <MenuItem value=''><em></em></MenuItem>
                                        <MenuItem value={'S/M'}>S/M Size</MenuItem>
                                        <MenuItem value={'L/XL'}>L/XL Size</MenuItem>
                                    </CustomSelect>
                                </FormControl>
                            </div>
                        </div>
                        
                        {
                            Object.values(nft).map((item:any, index:any) => {
                                return (
                                    <>
                                        <div className='row mb-1  p-2' >
                                            <div className='row border-radius-25 p-2' style={{border: '2px solid #7D75FE'}}>
                                                <div className='col col-md-4'>
                                                    <img id={index} className='img-fluid' src={item.img} />
                                                </div>
                                                <div className='col col-md-8 text-start pt-4 pb-4'>
                                                    <div>
                                                        Selected Artwork:
                                                    </div>
                                                    <div>
                                                        {/* # {item.id} */}
                                                        {item.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )})
                        }

                        <div className='bg-F91B border-radius-25 w-100'>
                            <div role={'button'} className='text-white lh-3' onClick={handleSubmit}>Check Out</div>
                        </div>
                        <div className='row mb-1 p-2' >
                            <div className='font-TTB fs-5 text-start pt-2 '>
                                Remark
                            </div>
                            <div className='fs-6 col text-start pb-4'>
                                <div>
                                    *Due to an overwhelming response to our hoodies, and every 
                                    hoodies are tailor made and one-of a-kind,  once your order 
                                    is placed, we estimate that it may take up to a maximum of
                                    6-8 weeks for your order to be shipped out. Please rest 
                                    assured that our team is working as quickly as we can to 
                                    process and ship your order.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <Collection_Bottom />
           <div className='position-fixed bottom-0 mb-5 w-100 d-flex justify-content-end'>
                <div className='me-3' role='button' onClick={()=>{window.scrollTo({top: 0})}}>
                    <img className='img-fiuld' src={require('../Resources/Asset/images/image_down_orange.png')} />
                </div>
            </div>
        </>
    );
};

export default ProductSelling;
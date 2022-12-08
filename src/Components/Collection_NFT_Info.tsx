import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimateHeight from 'react-animate-height';
import { BsHeartFill, BsBlockquoteRight, BsBox, BsDistributeHorizontal, BsStarFill, BsStar, BsFillGrid3X3GapFill, BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'

//Component
import Box from '../Components/Box';

//Services
import fetch from '../Services/fetch';

interface Props{
    info: any;
    rawData: Object[];
    reload: Function;
    passLogin: Function;
}

const imageAPI = "http://api.theme.com.hk/download/?name=";
// const imageAPI = "http://www.api_mongodb.com/download/?name=";
// const imageAPI = 'http://localhost:3000/download/?name='

const Collection_NFT_Info = ( {info, rawData, reload, passLogin}: Props ) => {

    const navigate = useNavigate();

    const [ displayData, setDisplayData ] = useState<any>('');
    const [ collectionRaw, setCollectionRaw ] = useState<any>({});
    const [ collectionData, setCollectionData ] = useState<any>({});
    const [ desHeight, setDesHeight ] = useState<any>(0)
    const [ abMysteryBox, setAbMysteryBox ] = useState<any>('auto');
    const [ detail, setDetail ] = useState<any>(0);

    const [ transferData, setTransferData ] = useState<any>({});
    const [ totalDays , setTotalDays ] = useState<any>(0);

    const handleClick = () => {
        navigate('/gallery/');
    }

    const handleNull = (e:any) =>{
        reload();
    }

    const handleCheckTrans = (e:any) => {
        fetch.getTransfer(e).then(
            (response:any)=>{
                if(response.statusCode === 200){
                    setTransferData(response.body.data);
                }
        });
    }
    
    useEffect(()=>{
        if(rawData.length > 0){
            setDisplayData(rawData.filter((newVal:any) => {
                return newVal.nft_id === Number(info);
            }));

            setCollectionRaw(rawData.filter((newVal:any) => {
                return newVal.nft_id !== Number(info);
            }));
        }
    },[rawData]);

    useEffect(()=>{
        if(collectionRaw.length > 0) {
            var rand_data = [];
            for(let x = 0; x < 10; x++ ){
                rand_data.push(collectionRaw[Math.floor(Math.random()*collectionRaw.length)]);
            }
            // var rand_data = collectionRaw[Math.floor(Math.random()*collectionRaw.length)];
            // console.log(rand_data);
            setCollectionData(rand_data.slice(0,10));
        }
    }, [collectionRaw]);

    useEffect(()=>{
        handleCheckTrans(info);
    },[])

    const calDate = () => {
        if(displayData){
            if(displayData.length > 0){

                var data_date = ''

                if (transferData.length > 0) {
                    data_date = transferData[0].DateTime.split('/');
                }else{
                    if (displayData[0].tu !== null){
                        data_date = displayData[0].tu.split('/');
                    }else{
                        data_date = displayData[0].UploadDate.split('/');
                    }
                }
                
                var date = new Date(data_date[1]+'/'+data_date[0]+'/'+data_date[2]);
                
                var nowdate = new Date();
                
                let date_1 = Math.floor(new Date(date).getTime());
                let date_2 = Math.floor(new Date(nowdate).getTime());
                let difference =  date_2 - date_1;

                // let difference = nowdate - date;

                if(isNaN(difference)){
                    setTotalDays(0);
                }else{
                    setTotalDays(Math.ceil(difference / ( 1000*3600 * 24 ) - 1 ));
                }
                
            }
            
        }
    }

    useEffect(()=>{
        calDate();
    },[displayData])

    return (
        <>
            {displayData? displayData.map((item:any) => {

                const id_char_length = 6;
                var display_id = '#';

                for (let x = 1; x < id_char_length - item.nft_id.toString().length; x++ ){
                    display_id = display_id + '0';
                }

                display_id = display_id + item.nft_id.toString();

                return (
                    <>
                    <div className='row d-flex justify-content-center'>
                        <div className='col col-sm-6 ps-5'>
                            <div className='col d-flex align-item-center justify-content-center position-relative'>
                                {item.User_Id !== null?
                                    (
                                        <>
                                            <div className='position-relative border-radius-25' style={{border: '2px solid #7D75FE'}}>
                                                <div className='row d-flex justify-content-end text-end bg-7DFE pt-1 pb-1' style={{borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '35px'}}>
                                                    <div className='col col-md-3 text-white'>
                                                        {item.likes}
                                                    </div>
                                                    <div className='col col-md-1 text-white ps-0 text-start'>
                                                        <BsHeartFill />
                                                    </div>
                                                </div>
                                                <div className='p-3'>
                                                    <img src={imageAPI + item.ImageSrc} className='img-fluid'/>
                                                </div>
                                            </div>
                                        </>
                                    )
                                :
                                    <div className='position-relative border-radius-25' style={{border: '2px solid #7D75FE'}}>
                                        <div className='row d-flex justify-content-end text-end bg-7DFE pt-1 pb-1' style={{borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '35px'}}>
                                            <div className='col col-md-3 text-white'>
                                                
                                            </div>
                                            <div className='col col-md-1 text-white ps-0 text-start'>

                                            </div>
                                        </div>
                                        <div className='p-3'>
                                        <img src={require('../Resources/Asset/images/Blindbox_image.png')} className='img-fluid' style={{width:'540px'}} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col col-sm-6 text-start font-TT pe-5'>
                            <div className='font-TT'>
                                Theme x Silkism
                            </div>
                            <div className='mt-3 mb-3 font-TTB display-6'>    
                                {display_id}
                            </div>
                            <>
                                <div className='mb-2'>
                                {item.User_Id !== null?
                                    <>
                                        Owned by <span className='color-F91B'>{item.FirstName} {item.LastName}</span>
                                    </>
                                :
                                    <>
                                        Minted by <span className='color-F91B'>Theme x Silkism</span>
                                    </>
                                }
                                </div>
                            </>
                            <div className='border-radius-25 pt-2 pb-2 mb-2' style={{border: '2px solid #7D75FE'}}>
                                <div className='row d-flex justify-content-start lh-3'>
                                    <div className='container row'>
                                        <div className='col col-sm-1 ps-3'>
                                            <BsBlockquoteRight />
                                        </div>
                                        <div className='col col-sm-9 ps-0 font-TTB'>
                                            Description
                                        </div>
                                        <div className='col col-sm-2 text-end pe-4 '>
                                            {desHeight===0?
                                            <BsChevronCompactDown role={'button'} onClick={()=>{setDesHeight('auto')}}/>
                                            :
                                            <BsChevronCompactUp role={'button'} onClick={()=>{setDesHeight(0)}}/>}
                                        </div>
                                    </div>
                                </div>
                                <AnimateHeight 
                                    height={desHeight}
                                >
                                    <hr className='m-0'/>
                                    <div className='row mt-2 mb-2'>
                                        <div className='container row'>
                                            <div className='col col-sm-12 ps-4 pe-4'>
                                                This hidden artwork, created by <span className='font-TTB'>Theme x Silkism</span>, can only by unlocked and revealed by the owner of this Mystery Box.
                                            </div>
                                        </div>
                                    </div>
                                </AnimateHeight>
                            </div>
                            <div className='border-radius-25 pt-2 pb-2 mb-2' style={{border: '2px solid #7D75FE'}}>
                                <div className='row d-flex justify-content-start lh-3'>
                                    <div className='container row'>
                                        <div className='col col-sm-1 ps-3'>
                                            <BsBox />
                                        </div>
                                        <div className='col col-sm-9 ps-0 font-TTB'>
                                            About Mystery Box
                                        </div>
                                        <div className='col col-sm-2 text-end pe-4  '>
                                            {abMysteryBox===0?
                                            <BsChevronCompactDown role={'button'} onClick={()=>{setAbMysteryBox('auto')}}/>
                                            :
                                            <BsChevronCompactUp role={'button'} onClick={()=>{setAbMysteryBox(0)}}/>}
                                        </div>
                                    </div>
                                </div>
                                <AnimateHeight 
                                    height={abMysteryBox}
                                >
                                <hr className='m-0'/>
                                <div className='row mt-2 mb-2'>
                                    <div className='container row'>
                                        <div className='col col-sm-12 ps-4 pe-4'>
                                            Who doesn't love some mystery?<br /><b className='font-TTB text-decoration-underline' role={'button'} onClick={() => {passLogin(true)}}>Register</b> and open your mystery box--each is revealing the surprise artwork!
                                        </div>
                                    </div>
                                </div>
                                </AnimateHeight>
                            </div>
                            <div className='border-radius-25 pt-2 pb-2 mb-2' style={{border: '2px solid #7D75FE'}}>
                                <div className='row d-flex justify-content-start lh-3'>
                                    <div className='container row'>
                                        <div className='col col-sm-1 ps-3'>
                                            <BsDistributeHorizontal />
                                        </div>
                                        <div className='col col-sm-9 ps-0 font-TTB'>
                                            Detail
                                        </div>
                                        <div className='col col-sm-2 text-end pe-4  '>
                                            {detail===0?
                                            <BsChevronCompactDown role={'button'} onClick={()=>{setDetail('auto')}}/>
                                            :
                                            <BsChevronCompactUp role={'button'} onClick={()=>{setDetail(0)}}/>}
                                        </div>
                                    </div>
                                </div>
                                <AnimateHeight 
                                    height={detail}
                                >
                                <hr className='m-0'/>
                                <div className='row mt-2 mb-2'>
                                    <div className='container row'>
                                        <div className='col col-sm-12 ps-4 pe-4'>
                                            <div className='row d-flex justify-content-between mt-2 mb-3'>
                                                <div className='col col-sm-3'>
                                                    Token ID.
                                                </div>
                                                <div className='col col-sm-7 text-end'>
                                                    {item.User_Id !== null?
                                                    (
                                                        <>
                                                            {item.token_code}
                                                        </>
                                                    )
                                                    :(
                                                        <>
                                                            n/a
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='row d-flex justify-content-between mb-2'>
                                                <div className='col col-sm-3'>
                                                    Last Updated
                                                </div>
                                                
                                                <div className='col col-sm-7 text-end'>
                                                    {totalDays} Days ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </AnimateHeight>
                            </div>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='row d-flex justify-content-center position-relative mt-3 mb-3 p-2 ps-0 pe-0 col col-sm-11' style={{border: '2px solid #7D75FE', borderRadius: '25px'}} >
                            <div className='row d-flex justify-content-start lh-3 w-100'>
                                <div className='containter row'>
                                    <div className='col col-sm-12 ps-0 font-TTB text-start'>
                                        <BsBlockquoteRight className='me-3'/>
                                        Item Activity
                                    </div>
                                </div>
                            </div>
                            <hr className='m-0'/>
                            <div className='row lh-3 text-start'>
                                <div className='col '>
                                    Event
                                </div>
                                <div className='col'>
                                    From
                                </div>
                                <div className='col'>
                                    To
                                </div>
                                <div className='col'>
                                    Date
                                </div>
                            </div>
                            <hr className='m-0'/>
                            {
                                transferData?(

                                    <>
                                        {Object.values(transferData).map((item_trans:any, index:any)=>{
                                            return (<div className='row lh-3 text-start'>
                                                <div className='col '>
                                                    <div>
                                                        {index === 0 && item_trans.fm_id !== null?
                                                        (
                                                            <>
                                                                <BsStarFill /> Transfered
                                                            </>
                                                        ):(
                                                            <>
                                                                <BsStarFill /> Owned
                                                            </>
                                                        )} 
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                    {item_trans.fm_id !== null?
                                                    (
                                                        <>
                                                            <span className='color-F91B'>{item_trans.fm_FirstName} {item_trans.fm_LastName}</span>
                                                        </>
                                                    ):(
                                                        <>
                                                            <span className='color-F91B'>Theme x Silkism</span>
                                                        </>
                                                    )} 
                                                    
                                                </div>
                                                <div className='col'>
                                                    <span className='color-F91B'>{item_trans.to_FirstName} {item_trans.to_LastName}</span>
                                                </div>
                                                <div className='col'>
                                                    {item_trans.DateTime}
                                                </div>
                                            </div> )
                                        })}
                                    </>
                                ):''
                            }
                            <div className='row lh-3 text-start'>
                                <div className='col '>
                                    <div>
                                        <BsStar /> Minted
                                    </div>
                                </div>
                                <div className='col'>
                                    <span className='color-F91B'>Theme</span>
                                </div>
                                <div className='col'>
                                    <span className='color-F91B'>Theme x Silkism</span>
                                </div>
                                <div className='col'>
                                    {item.UploadDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }):''}
            <div className='row d-flex justify-content-center'>
                <div className='row border-radius-25 mt-3 mb-3 p-0 col col-sm-11' style={{border: '2px solid #7D75FE'}}>
                    <div className='row d-flex justify-content-start lh-3'>
                        <div className='containter row'>
                            <div className='col col-sm-12 ps-0 font-TTB text-start'>
                                <BsFillGrid3X3GapFill className='me-3'/>
                                More From This Collection
                            </div>
                        </div>
                        {/* <div className='col col-sm-1'>
                            <BsFillGrid3X3GapFill />
                        </div> */}
                        {/* <div className='col col-sm-4 ps-0 text-start font-TTB'>
                            More From This Collection
                        </div> */}
                    </div>
                    <hr className='m-0'/>
                    <div className='row d-flex justify-content-center pt-2 pb-2'>
                        {collectionData?<Box info={collectionData} reload={handleNull} passTrans={()=>{}} />:''}
                    </div>
                    <hr className='m-0'/>
                    <div className='row pt-2 pb-2 d-flex justify-content-center mt-3 mb-3'>
                        <div className='col col-sm-2 bg-7DFE lh-3 text-white border-radius-25' role='button' onClick={handleClick}>
                            View Collection
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collection_NFT_Info;
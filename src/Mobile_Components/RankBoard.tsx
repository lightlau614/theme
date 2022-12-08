import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RankListItem from './RankListItem';

interface BoardProps{
    list: Array<any>;
}

interface ListProps{
    subList: Array<any>;
    rankStart: number;
}

const RankBoardList = ({subList, rankStart}: ListProps) =>{

    const [list, setList] = useState<any>([]);

    useEffect(()=>{
        setList(subList);
    }, [subList])

    return (
        <>
            {list && list.map((item:any, i:any)=>{
                return(
                    <RankListItem rank={i+rankStart} data={item}/>
                )
            })}
        </>
    )
}

const RankBoard = ({list}: BoardProps) => {

    const navigate = useNavigate();

    const [leftList, setleftList] = useState<any>([]);
    const [rightList, setrightList] = useState<any>([]);

    useEffect(()=>{
        setleftList(list.slice(0, 5));
        setrightList(list.slice(5, 10));
    }, [list])

    return (
        <div className='w-100 m-auto'>
            <div className='row d-flex justify-content-center'>
                <div className='row w-100 p-0'>
                    <div className='col m-auto p-0'>
                        <h1 className='text-start font-TTB lh-lg mb-0'>Trending</h1>
                    </div>
                    {/* <div className='col col-md-3 mt-2 pt-2 pb-2 fs-5'>
                        <div className='row bg-F91B w-100 border-radius-25 font-TTB text-center'  role='button' onClick={()=>{navigate('/gallery');}}>
                            <div className='col col-md-12 h-75 mt-2 mb-2'>
                                See All
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            
            <hr style={{
                border: '1px solid white',
                height: '4px',
                backgroundColor: 'white',
                opacity: '1'
            }} className='mt-0 mb-2'/>
            
            
            <div className='row'>
                <div className='col p-0'>
                    <div className='row w-100 color-F91B fs-6 font-TT p-0'>
                        <div className='col-8 p-0 text-start'>Collec<span>t</span>ion</div>
                        <div className='col-4 p-0 text-center'>Volume</div>
                    </div>
                    <RankBoardList subList={leftList} rankStart={1}/>
                </div>
            </div>

            <div className='row d-flex justify-content-center mt-4 mb-5'>
                <div className='bg-F91B w-50 border-radius-25 font-TTB text-center'  role='button' onClick={()=>{navigate('/gallery');}}>
                    <div className='col mt-2 mb-2'>
                        See All
                    </div>
                </div>
            </div>
            
                  
        </div>
    );
};

export default RankBoard;
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
        <div className='text-start'>
 
            <div>
                <div className='row w-100 color-F91B fs-4 '>
                    <div className='col col-sm-4'>Collection</div>
                    <div className='col text-end'>Volume</div>
                </div>
            {list && list.map((item:any, i:any)=>{
                return(
                    <RankListItem rank={i+rankStart} data={item}/>
                )
            })}
            </div>

        </div>
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
        <div className='w-75 m-auto'>
            <div className='d-flex justify-content-center row'>
                <div className='row w-100 p-0'>
                    <div className='col col-md-9'>
                        <h1 className='text-start font-TTB lh-lg mb-0'>Trending</h1>
                    </div>
                    <div className='col col-md-3 mt-2 pt-2 pb-2 fs-5'>
                        <div className='row bg-F91B w-100 border-radius-25 font-TTB text-center'  role='button' onClick={()=>{window.location.href = '/gallery';}}>
                            <div className='col col-md-12 h-75 mt-2 mb-2'>
                                See All
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr style={{
                borderColor: 'white',
                height: '4px',
            }} className='color-white bg-white'/>
            
            
            <div className='row'>
                <div className='col'>
                    <RankBoardList subList={leftList} rankStart={1}/>
                </div>
                <div className='col'>
                    <RankBoardList subList={rightList} rankStart={6}/>
                </div>
            </div>
                  
        </div>
    );
};

export default RankBoard;
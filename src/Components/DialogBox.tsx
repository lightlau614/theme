import React, { useState, useEffect, useRef } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Button, Paper, Typography } from '@mui/material';

interface Props{
    dialogData: any,
    diaOpen: boolean,
    returnDia: Function,
}

const DialogBox = ( { dialogData, diaOpen, returnDia }:Props) =>{

    // const [open, setOpen] = useState<boolean>(false);
    // const [scroll] = useState<DialogProps['scroll']>('paper');

    // const [ count , setCount ] = useState<number>(0);

    // const [ imgSrc, setimgsrc ] = useState<string>('');

    // const descriptionElementRef = useRef<HTMLElement>(null);

    // const [prediction, setPrediction] = useState<ClassifyReturn | null>(
    //     null
    // );

    // const handleClose= () => {
    //     setOpen(false);
    //     setCount(0);
    //     returnDia(false);
    // }

    // if(diaOpen){
    //     if(count === 0){
    //         setCount(1);
    //         setOpen(true);
    //     }
    // }   
    
    // useEffect(()=>{
    //     if(open){
    //         setPrediction(null);
    //         const { current: descriptionElement } = descriptionElementRef;
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus();
    //         }
    //         setimgsrc(dialogData[0].image_list_on_S3?dialogData[0].image_list_on_S3[0]:dialogData.image_list_from_source);
    //     }
    // },[open]);

    // const handleMouseOver = ( e:any ) => {
    //     setimgsrc(e.target.currentSrc);
    // }

    // const return_Pencent = async ( item: any) => {
    //     setPrediction(item);
    // }

    // return dialogData?dialogData.map( (Record:any, index:any) => (
    //     <>
    //         <Dialog
    //             fullWidth
    //             open={open}
    //             onClose={handleClose}
    //             scroll={scroll}
    //             maxWidth="lg"
    //             aria-labelledby="scroll-dialog-title"
    //             aria-describedby="scroll-dialog-description"
    //             key={index}
    //         >
    //             <DialogTitle  id="scroll-dialog-title" >{Record.brand}</DialogTitle >
    //             <DialogContent dividers={scroll === 'paper'}>
    //                 <DialogContentText
    //                     id="scroll-dialog-description"
    //                     ref={descriptionElementRef}
    //                     tabIndex={-1}
    //                 >
    //                     <div className='container'>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <div className='row'>
    //                                     <div className='col'>
    //                                         <div className='preview'>
    //                                             <TensorModel imgPhoto={imgSrc} return_Pencent={return_Pencent} />                                                
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div className='row'>
    //                                 {Record.image_list_on_S3.map((img:any ,index: any)=>{
    //                                     return(
    //                                         <div className='col-sm-3'>
    //                                             <div key={index} className='preview-sm-pic'>
    //                                             <img src={img} onMouseMove={handleMouseOver}/>
    //                                             </div>
    //                                         </div>    
    //                                     )
    //                                 })}
    //                                 </div>
    //                             </div>
    //                             <div className='col'>
    //                                 <div className='row'>
    //                                 <div className='col'>
    //                                     Brand
    //                                 </div>
    //                                 <div className='col'>
    //                                     {Record.brand}
    //                                 </div>
    //                                 </div>
    //                                 <div className='row'>
    //                                 <div className='col'>
    //                                     Gender
    //                                 </div>
    //                                 <div className='col'>
    //                                     {Record.gender}
    //                                 </div>
    //                                 </div>
    //                                 <div className='row'>
    //                                 <div className='col'>
    //                                     Product Type
    //                                 </div>
    //                                 <div className='col'>
    //                                     {Record.product_type}
    //                                 </div>
    //                                 </div>
    //                                 {Record.color?
    //                                 <div className='row'>
    //                                 <div className='col'>
    //                                     Color
    //                                 </div>
    //                                 <div className='col'>
    //                                     {Record.color}
    //                                 </div>
    //                                 </div>:''} 
    //                                 {Record.material?
    //                                 <div className='row'>
    //                                 <div className='col'>
    //                                     Material
    //                                 </div>
    //                                 <div className='col'>
    //                                     {Record.material}
    //                                 </div>
    //                                 </div>:''}
    //                                 {Record.tags.length>0?
    //                                 <div className='row'>
    //                                     <div className='col'>
    //                                         Tags
    //                                     </div>
    //                                     <div className='col'>
    //                                     {Record.tags.map((tag:any ,index: any)=>{
    //                                         return(
    //                                         <div className='row'>
    //                                             <div key={index} className='col'>
    //                                             {tag}
    //                                             </div>
    //                                         </div>    
    //                                         )
    //                                     })}
    //                                     </div>
    //                                 </div>:''}
    //                                 {prediction && prediction.length>0?(
    //                                     <>
    //                                     <div className='row'>
    //                                         <div className='col'>
    //                                             Prediction:
    //                                         </div>
    //                                         <div className='col'>
    //                                             {prediction?prediction[0].className:''}
    //                                         </div>        
    //                                     </div>
    //                                     <div className='row'>
    //                                         <div className='col'>
    //                                         Probability:
    //                                         </div>
    //                                         <div className='col'>
    //                                         {Math.floor(prediction?prediction[0].probability * 100:0)}%
    //                                         </div>
    //                                     </div>
    //                                     </>
    //                                      ):
    //                                     <div>
    //                                         no prediction
    //                                     </div>}
    //                             </div>
    //                         </div>
    //                         {Record.unstructured_info?
    //                         <div>
    //                             <div className='row'>
    //                                 <div className='col'>
    //                                 Description
    //                                 </div>
    //                             </div>
    //                             <div className='row'>
    //                                 <div className='col'>
    //                                 {Record.unstructured_info}
    //                                 </div>
    //                             </div>
    //                         </div>:''}
                            
    //                     </div>
    //                 </DialogContentText>
    //             </DialogContent>
    //             <DialogActions>
    //                 <Button onClick={handleClose}>Close</Button>
    //             </DialogActions>
    //         </Dialog>
    //     </>
    // )):'';
    return null;
}

export default DialogBox;


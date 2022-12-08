
interface Props{
    src: string,
    updateCount: Function
}

const MarqueeItem = ({src, updateCount}:Props) =>{

    const onClick = (event: any) =>{
        event.preventDefault();
        updateCount()
        alert("Clicked"+src)
    }

    return (
        <div className="marquee-item-box">
            <img src={src} onClick={e=>onClick(e)} className=""></img>
        </div>
    )
}

export default MarqueeItem;
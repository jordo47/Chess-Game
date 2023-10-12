import './Tile.css';

interface Props 
{
    img?: string;
    num: number;
}

export default function Tile({num, img}: Props)
{
    if (num % 2 === 0)
    {
        return (
            <div className='tile black-tile'>
                {img && <div style={{backgroundImage: `url("${img}")`}} className='piece'></div>}
            </div>
        );
    }
    else
    {
        return (
            <div className='tile white-tile'>
                {img && <div style={{backgroundImage: `url("${img}")`}} className='piece'></div>}
            </div>
        );
    } 
}
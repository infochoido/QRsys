// src/components/Header.js
import { Link, useParams } from 'react-router-dom';

export default function Header() {
    const {tableId} = useParams();
    return (
        <div className="flex flex-row justify-around items-center w-screen p-4">
            
            <div className='font-black text-xl'>예과주막</div>
            <Link to={`/order/ordered/${tableId}`} className="cursor-pointer">주문내역</Link> 
        </div>
    );
}

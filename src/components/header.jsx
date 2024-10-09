// src/components/Header.js
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function Header() {
    const { tableId } = useParams();
    const navigate = useNavigate();

    function goToHome(){
        
        navigate(`/order/${tableId}`)
        
    }
    return (
        <div className="flex flex-row justify-around items-center w-screen p-4 shadow-lg mb-4"> {/* 그림자 추가 */}
            <button onClick={goToHome} className='font-black text-xl'>예과주막</button>
            <Link to={`/order/ordered/${tableId}`} className="cursor-pointer">주문내역</Link> 
        </div>
    );
}

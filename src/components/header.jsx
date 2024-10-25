import { Link, useParams, useNavigate } from 'react-router-dom';
import logo from "../header_image/logo.png";

export default function Header() {
    const { tableId } = useParams();
    const navigate = useNavigate();

    function goToHome() {
        navigate(`/order/${tableId}`);
    }
   

    return (
        <div className="flex flex-row justify-between items-center w-screen p-4 px-6 shadow-lg mb-4">
            <button onClick={goToHome} className=" font-black text-xl">
                <img src={logo} alt="logo" className='w-[170px]' />
            </button>
            <Link to={`/order/ordered/${tableId}`} className="cursor-pointer">
                주문내역
            </Link>
        </div>
    );
}

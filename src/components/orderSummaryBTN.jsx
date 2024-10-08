import { useNavigate, useParams } from 'react-router-dom';

export default function OrderSummaryBTN() {
    const navigate = useNavigate();
    const { tableId } = useParams(); // Get the table ID from the URL

    const handleClick = () => {
        navigate(`/order/summary/${tableId}`); // Navigate to the summary page
    };

    return (
        <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded-md">
            장바구니 보기
        </button>
    );
}

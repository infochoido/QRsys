import { useNavigate, useParams } from 'react-router-dom';

export default function OrderSummaryBTN() {
    const navigate = useNavigate();
    const { tableId } = useParams();

    const handleOrderComplete = () => {        
        navigate(`/order/complete/${tableId}`); 
    };

    return (
        <button 
            onClick={handleOrderComplete}
            className="bg-blue-500 text-white p-2 rounded-md"
        >
            주문하기
        </button>
    );
}
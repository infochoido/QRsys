import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { orderState } from '../state/state'; // 주문 상태를 recoil에서 가져옴

export default function OrderSummaryBTN() {
    const navigate = useNavigate();
    const { tableId } = useParams(); // URL에서 테이블 ID 가져오기
    const orders = useRecoilValue(orderState); // 주문 목록 상태 가져오기

    // 주문 종류의 수 계산 (orders 배열의 길이로 계산)
    const uniqueItemsCount = orders.length;

    const handleClick = () => {
        navigate(`/order/summary/${tableId}`); // 요약 페이지로 이동
    };

    return (
        <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-8 rounded-md z-50">
            장바구니 보기 ({uniqueItemsCount})
        </button>
    );
}

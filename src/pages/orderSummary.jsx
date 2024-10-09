import { useRecoilValue } from 'recoil';
import { orderState } from '../state/state';
import { useParams, useNavigate } from 'react-router-dom';
import OrderBTN from '../components/orderBTN';

export default function OrderSummary() {
    const orders = useRecoilValue(orderState); // 주문 상태를 recoil에서 가져오기
    const { tableId } = useParams(); // tableId 추출
    const navigate = useNavigate();
    
    const handleInitialClick = () => {
        navigate(`/order/${tableId}`);
    }

    // 총가격 계산
    const totalPrice = orders.reduce((total, order) => total + (order.price * order.quantity), 0);

    return (
        <div className='flex-col flex gap-2'>
            <h2 className="text-2xl font-bold mb-4">장바구니</h2>
            <p>테이블 번호: {tableId}</p>
            
            {orders.length > 0 ? ( // 주문이 있을 경우 
                <>
                    {orders.map((order, index) => (
                        <div key={index} className="flex justify-between">
                            <span>{order.name} ( 수량 {order.quantity} ) </span>
                            <span> : {order.price * order.quantity} 원</span> {/* 메뉴별 가격 표시 */}
                        </div>
                    ))}
                    <div className="m-2 text-lg font-bold">
                        총가격: {totalPrice} 원
                    </div>
                </>
            ) : (
                <p>주문이 없습니다.</p>
            )}

            <OrderBTN />
            <button onClick={handleInitialClick} className="bg-blue-500 text-white p-2 rounded-md">
                뒤로가기
            </button>
        </div>
    );
}

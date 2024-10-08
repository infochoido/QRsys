// src/pages/OrderSummary.js
import { useRecoilValue } from 'recoil';
import { orderState } from '../state/state';
import { useParams } from 'react-router-dom';
import OrderBTN from '../components/orderBTN';

export default function OrderSummary() {
    const orders = useRecoilValue(orderState); // 주문 상태를 가져옵니다.
    const { tableId } = useParams(); // tableId를 가져옵니다.

    return (
        <div>
            <h2>주문 내역</h2>
            <p>테이블 번호: {tableId}</p>
            {orders.length > 0 ? ( // 주문이 있을 경우
                orders.map((order, index) => (
                    <div key={index}>
                        <span>{order.name}: {order.quantity}</span>
                    </div>
                ))
            ) : (
                <p>주문이 없습니다.</p>
            )}
            <OrderBTN />
        </div>
    );
}

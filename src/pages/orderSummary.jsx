import { useRecoilValue, useSetRecoilState } from 'recoil';
import { orderState } from '../state/state';
import { useParams, useNavigate } from 'react-router-dom';
import OrderBTN from '../components/orderBTN';

export default function OrderSummary() {
    const orders = useRecoilValue(orderState); // 주문 상태를 recoil에서 가져오기
    const setOrders = useSetRecoilState(orderState); // 주문 상태 업데이트를 위한 함수
    const { tableId } = useParams(); // tableId 추출
    const navigate = useNavigate();
    
    const handleInitialClick = () => {
        navigate(`/order/${tableId}`);
    };

    // 총가격 계산
    const totalPrice = orders.reduce((total, order) => total + (order.price * order.quantity), 0);

    // 수량 증가 함수
    const increaseQuantity = (index) => {
        setOrders((prevOrders) =>
            prevOrders.map((order, i) =>
                i === index ? { ...order, quantity: order.quantity + 1 } : order
            )
        );
    };

    // 수량 감소 함수
    const decreaseQuantity = (index) => {
        setOrders((prevOrders) => 
            prevOrders
                .map((order, i) => 
                    i === index ? { ...order, quantity: order.quantity - 1 } : order
                )
                .filter((order) => order.quantity > 0) // 수량이 0이면 제거
        );
    };

    return (
        <div className='flex-col flex gap-2 w-[85%]'>
            <h2 className="text-2xl font-bold mb-4">장바구니</h2>
            <p>테이블 번호: {tableId}</p>
            
            {orders.length > 0 ? ( // 주문이 있을 경우 
                <>
                    {orders.map((order, index) => (
                        <div key={index} className="flex justify-between items-center border px-2">
                            <div>
                                <span>{order.name} ( 수량 {order.quantity} ) </span>
                                <span> : {order.price * order.quantity} ₩</span> {/* 메뉴별 가격 표시 */}
                            </div>
                            <div className="flex gap-2 mx-2">
                                <button 
                                    onClick={() => decreaseQuantity(index)} 
                                    className="bg-gray-200 text-sm px-2 py-1 rounded-md"
                                >
                                    -
                                </button>
                                <button 
                                    onClick={() => increaseQuantity(index)} 
                                    className="bg-gray-200 text-sm px-2 py-1 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="m-2 text-lg font-bold">
                        총가격: {totalPrice} ₩
                    </div>
                    {/* 주문하기 버튼, 주문이 있을 경우에만 표시 */}
                    <OrderBTN />
                </>
            ) : (
                <p className='font-bold'>주문이 없습니다.</p>
            )}

            <button onClick={handleInitialClick} className="bg-maincolor text-white p-2 rounded-md">
                뒤로가기
            </button>
        </div>
    );
}

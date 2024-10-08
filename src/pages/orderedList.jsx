// src/pages/OrderedList.js
import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Firebase 초기화 파일에서 db 가져오기
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams,useNavigate } from 'react-router-dom';

export default function OrderedList() {
    const { tableId } = useParams(); // URL에서 테이블 ID를 가져옵니다.
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    
    const handleInitialClick=()=>{
        navigate(`/order/${tableId}`)
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const tableRef = doc(collection(db, 'tables'), tableId); // 테이블 컬렉션 참조
                const tableDoc = await getDoc(tableRef);
                
                if (tableDoc.exists()) {
                    const data = tableDoc.data();
                    setOrders(data.orders || []); // 주문 데이터 가져오기
                } else {
                    console.log("주문이 없습니다.");
                }
            } catch (error) {
                console.error("주문 가져오기 실패: ", error);
            }
        };

        fetchOrders();
    }, [tableId]); // tableId가 변경될 때마다 호출

    return (
        <div>
            <h2>주문 내역</h2>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index}>
                        <span>{order.name}: {order.quantity}</span>
                    </div>
                ))
            ) : (
                <p>주문 내역이 없습니다.</p>
            )}
            <button onClick={handleInitialClick} className="bg-blue-500 text-white p-2 rounded-md">처음으로</button>
        </div>
    );
}

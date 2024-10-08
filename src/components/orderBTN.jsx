// src/components/OrderBTN.js
import { db } from '../firebase'; // Firebase 초기화 파일에서 db 가져오기
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'; // getDoc 추가
import { useRecoilValue, useSetRecoilState } from 'recoil'; // useSetRecoilState 추가
import { orderState } from '../state/state';
import { useParams, useNavigate } from 'react-router-dom';

export default function OrderBTN() {
    const orders = useRecoilValue(orderState); // 주문 상태를 recoil에서 가져옵니다.
    const setOrders = useSetRecoilState(orderState); // 주문 상태를 업데이트하기 위한 훅
    const { tableId } = useParams(); // URL에서 테이블 ID를 가져옵니다.
    const navigate = useNavigate();

    const handleOrderSubmit = async () => {
        try {
            // Firestore에서 기존 주문 가져오기
            const tableRef = doc(collection(db, 'tables'), tableId); // 테이블 컬렉션 참조
            const tableDoc = await getDoc(tableRef);
            let existingOrders = [];

            if (tableDoc.exists()) {
                existingOrders = tableDoc.data().orders || []; // 기존 주문이 있을 경우 가져오기
            }

            // 기존 주문과 새로운 주문을 결합합니다.
            const updatedOrders = [...existingOrders]; // 기존 주문을 새로운 배열에 복사

            // 중복 체크 및 수량 증가
            orders.forEach(order => {
                const existingOrderIndex = updatedOrders.findIndex(o => o.name === order.name);
                if (existingOrderIndex !== -1) {
                    // 기존 주문이 있으면 수량만 증가
                    updatedOrders[existingOrderIndex].quantity += order.quantity;
                } else {
                    // 기존 주문이 없으면 새로운 주문 추가
                    updatedOrders.push({ ...order }); // 객체 복사하여 추가
                }
            });

            // Firestore에 업데이트된 주문 데이터 저장
            await setDoc(tableRef, {
                orders: updatedOrders, // 최종 주문 데이터 추가
            });

            console.log("주문이 Firestore에 저장되었습니다.");
            setOrders([]); // 주문이 완료된 후 상태를 비웁니다.
            navigate(`/order/complete/${tableId}`);
        } catch (error) {
            console.error("주문 저장 실패: ", error);
        }
    };

    return (
        <button onClick={handleOrderSubmit} className="bg-blue-500 text-white p-2 rounded-md">
            주문하기
        </button>
    );
}

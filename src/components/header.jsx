import { useParams } from 'react-router-dom';

export default function Header() {
    const { tableId } = useParams(); // URL에서 tableId 가져오기

    return (
        <div className="flex flex-row justify-between items-center w-screen p-4">
            <div>테이블</div> {/* tableId를 사용하여 숫자 표시 */}
            <div>예과주막</div>
            <div>주문내역</div>
        </div>
    );
}

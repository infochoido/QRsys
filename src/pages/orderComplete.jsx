import { useParams,useNavigate } from "react-router-dom"

export default function OrderComplete(){
    const {tableId} = useParams();
    const navigate = useNavigate();

    const handleInitialClick=()=>{
        navigate(`/order/${tableId}`)
    }

    return(
        <div>
            <h1>주문이 완료되었습니다.</h1>
            <p>테이블 번호 : {tableId} </p>
            <button onClick={handleInitialClick} className="bg-blue-500 text-white p-2 rounded-md">처음으로</button>
        </div>
    )
}
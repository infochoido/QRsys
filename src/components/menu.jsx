import { useState } from "react";

export default function Menu({ imageSrc, name, addOrder, price }) {
    const [showButtons, setShowButtons] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const toggleButtons = () => {
        setShowButtons(!showButtons);
        if (!showButtons) {
            setQuantity(0);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleConfirm = () => {
        if (quantity > 0) {
            addOrder({ name, quantity, price });
        }
        setQuantity(0); // 수량 초기화
        setShowButtons(false); // 항상 toggle 닫기
    };

    return (
        <div className="flex items-center p-2 border border-gray-300 rounded-md"> {/* flex로 레이아웃 설정 */}
            {/* 왼쪽 이미지 */}
            <div className="w-1/3"> {/* 이미지를 왼쪽에 배치, 너비 1/3 할당 */}
                <img src={imageSrc} alt={name} className="w-full h-auto rounded-md" />
            </div>

            {/* 오른쪽 텍스트와 버튼들 */}
            <div className="w-2/3 flex flex-col justify-between pl-4"> {/* 나머지 2/3을 정보에 할당 */}
                <div className="flex justify-between items-center text-sm"> {/* 메뉴 이름과 가격 */}
                    <span className="font-bold truncate">{name}</span> {/* 메뉴명 */}
                    <span>{price}₩</span> {/* 가격 */}
                </div>

                {showButtons && <span className="text-sm mt-2">주문 수량: {quantity}</span>} {/* 주문 수량 */}

                <div className="flex justify-between items-center mt-2"> {/* 수량 버튼 */}
                    {showButtons ? (
                        <>
                            <button onClick={decreaseQuantity} className="bg-gray-200 text-sm px-2 py-1 rounded-md">-</button>
                            <button onClick={handleConfirm} className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md">확인</button>
                            <button onClick={increaseQuantity} className="bg-gray-200 text-sm px-2 py-1 rounded-md">+</button>
                        </>
                    ) : (
                        <button onClick={toggleButtons} className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md">
                            담기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";

export default function Menu({ imageSrc, name, addOrder, price, available }) {
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
        <div className="flex items-center p-1 border border-gray-300 rounded-md h-28">
            {/* 왼쪽 이미지 */}
            <div className="w-1/3 p-1">
                <img src={imageSrc} alt={name} className="w-full h-full  rounded-md" />
            </div>

            {/* 오른쪽 텍스트와 버튼들 */}
            <div className="w-2/3 flex flex-col justify-between ml-1">
                <div className="justify-between items-center text-md">
                    <p className="font-bold text-[12px] w-34">{name}</p>
                    <p className="text-sm">{price} 장</p>
                </div>

                {available ? (
                    <>
                        {showButtons && <span className="text-xs">주문 수량: {quantity}</span>}
                        <div className="flex justify-between items-center">
                            {showButtons ? (
                                <>
                                    <button onClick={decreaseQuantity} className="bg-gray-200 text-sm px-2 py-1 rounded-md">-</button>
                                    <button onClick={handleConfirm} className="bg-maincolor text-white text-sm px-2 py-1 rounded-md">확인</button>
                                    <button onClick={increaseQuantity} className="bg-gray-200 text-sm px-2 py-1 rounded-md">+</button>
                                </>
                            ) : (
                                <button onClick={toggleButtons} className="bg-maincolor text-white text-sm px-2 py-1 rounded-md">
                                    담기
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-red-500 mt-2 font-semibold">Sold Out</div>
                )}
            </div>
        </div>
    );
}

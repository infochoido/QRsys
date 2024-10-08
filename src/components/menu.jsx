// src/components/Menu.js
import { useState } from "react";

export default function Menu({ imageSrc, name, addOrder }) {
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
            addOrder({ name, quantity }); // 주문을 추가합니다.
            setQuantity(0); // 수량 초기화
            setShowButtons(false); // 버튼 숨기기
        }
    };

    return (
        <div className={`grid ${showButtons ? 'grid-rows-5' : 'grid-rows-4'} grid-cols-1 gap-4 gap-y-1 p-4 border border-gray-300 rounded-md`}>
            <div className="row-span-3">
                <img src={imageSrc} alt={name} className="w-full h-auto rounded-md" />
            </div>
            
            <div className="flex justify-between items-center">
                <span className="font-bold">{name}</span>
                {showButtons && <span>주문 수량: {quantity}</span>} 
                <button onClick={toggleButtons} className="bg-blue-500 text-white p-2 rounded-md">
                    {showButtons ? '취소' : '담기'}
                </button>
            </div>
            
            {showButtons && (
                <div className="flex justify-between items-center">
                    <button onClick={decreaseQuantity} className="bg-gray-200 p-2 rounded-md">-</button>
                    <button onClick={handleConfirm} className="bg-blue-500 text-white p-2 rounded-md">확인</button>
                    <button onClick={increaseQuantity} className="bg-gray-200 p-2 rounded-md">+</button>
                </div>
            )}
        </div>
    );
}

import { useParams } from 'react-router-dom';
import Menu from "../components/menu";
import OrderSummaryBTN from "../components/orderSummaryBTN";
import { useRecoilValue, useSetRecoilState } from 'recoil'; 
import { orderState } from '../state/state';
import { useState } from 'react'; 

// 이미지 파일을 import
import ramenImg from "../menu_image/food_example.jpg"; // 라면 이미지
import kimbapImg from "../menu_image/food_example.jpg"; // 김밥 이미지
import tteokbokkiImg from "../menu_image/food_example.jpg"; // 떡볶이 이미지
import friedImg from "../menu_image/food_example.jpg"; // 튀김 이미지
import udonImg from "../menu_image/food_example.jpg"; // 우동 이미지
import bbqImg from "../menu_image/bbq_image.jpg"; // 바베큐 이미지

const menuItems = [
    { src: ramenImg, name: "라면", price: 3000 },
    { src: kimbapImg, name: "김밥", price: 5000 },
    { src: tteokbokkiImg, name: "수육", price: 7000 },
    { src: friedImg, name: "튀김", price: 100000 },
    { src: udonImg, name: "우동", price: 5500 },
    { src: bbqImg, name: "바베큐", price: 2000 },
    { src: bbqImg, name: "아이스황도", price: 2000 },
    { src: bbqImg, name: "맥주", price: 2000 },
];

export default function OrderPage() {
    const orders = useRecoilValue(orderState);
    const setOrders = useSetRecoilState(orderState);
    const { tableId } = useParams();
    const isOrderAvailable = orders.length > 0;

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => {
            const existingOrder = prevOrders.find(order => order.name === newOrder.name);
            if (existingOrder) {
                return prevOrders.map(order => 
                    order.name === newOrder.name 
                    ? { ...order, quantity: order.quantity + newOrder.quantity } 
                    : order
                );
            }
            return [...prevOrders, { ...newOrder, price: newOrder.price }];
        });
    };
    

    return (
        <>
        <p className='my-2 w-[85%]'>테이블 번호: {tableId} </p>
        <div className="flex flex-col gap-4 p-2 border border-gray-300 rounded-md z-50 w-[85%]"> {/* flex로 바꾸고 세로로 정렬 */}
            {menuItems.map((item, index) => (
                <div key={index} >
                    <Menu imageSrc={item.src} name={item.name} addOrder={addOrder} price={item.price} />
                </div>
            ))}

            {/* 고정된 장바구니 버튼 */}
            {isOrderAvailable && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-999">
                    <OrderSummaryBTN />
                </div>
            )}
        </div>
        </>
    );
}

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
import sausageImg from "../menu_image/food_example.jpg"; // 소세지 이미지

const menuItems = [
    { src: ramenImg, name: "라면", price: 3000 },
    { src: kimbapImg, name: "김밥", price: 5000 },
    { src: tteokbokkiImg, name: "떡볶이", price: 7000 },
    { src: friedImg, name: "튀김", price: 10000 },
    { src: udonImg, name: "우동", price: 5500 },
    { src: sausageImg, name: "소세지", price: 2000 },
];

export default function OrderPage() {
    const orders = useRecoilValue(orderState);
    const setOrders = useSetRecoilState(orderState);
    const isOrderAvailable = orders.length > 0;

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => {
            const existingOrder = prevOrders.find(order => order.name === newOrder.name);
            if (existingOrder) {
                // 수량 업데이트
                return prevOrders.map(order => 
                    order.name === newOrder.name 
                    ? { ...order, quantity: order.quantity + newOrder.quantity } 
                    : order
                );
            }
            // 새로운 주문 추가 시 price 포함
            return [...prevOrders, { ...newOrder, price: newOrder.price }];
        });
    };

    return (
        <>
        <div className={`grid ${isOrderAvailable ? 'grid-rows-5' : 'grid-rows-4'} grid-cols-2 gap-4 gap-y-1 p-4 border border-gray-300 rounded-md z-50`}>
            {menuItems.map((item, index) => (
                <div key={index}>
                    <Menu imageSrc={item.src} name={item.name} addOrder={addOrder} price={item.price} />
                </div>
            ))}

            {isOrderAvailable && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-999">
                    <OrderSummaryBTN />
                </div>
            )}
        </div>
        </>
    );
}

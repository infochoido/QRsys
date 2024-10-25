import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore instance
import { useParams } from 'react-router-dom';
import Menu from "../components/menu";
import OrderSummaryBTN from "../components/orderSummaryBTN";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { orderState } from '../state/state';

// Image imports
import ramenImg from "../menu_image/ramenImg.jpg"; // 라면 이미지
import peachImg from "../menu_image/peachImg.jpg"; // 김밥 이미지
import corncheezeImg from "../menu_image/corncheezeImg.jpg"; // 떡볶이 이미지
import spicyporkImg from "../menu_image/spicyporkImg.jpg"; // 튀김 이미지
import boiledporkImg from "../menu_image/boiledporkImg.jpg"; // 우동 이미지
import odenImg from "../menu_image/odenImg.jpg"; // 도전요리왕 3권 18장 "어묵탕"
import bobImg from "../menu_image/bobImg.jpg"; // 유비빔의 참치마요 비빔컵밥
import staffImg from "../menu_image/staffImg.jpg";

// Image mapping object
const imageMapping = {
  ramenImg: ramenImg,
  peachImg: peachImg,
  corncheezeImg: corncheezeImg,
  spicyporkImg: spicyporkImg,
  boiledporkImg: boiledporkImg,
  staffImg: staffImg,
  odenImg: odenImg,
  bobImg: bobImg,
  
};

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const orders = useRecoilValue(orderState);
  const setOrders = useSetRecoilState(orderState);
  const { tableId } = useParams();
  const isOrderAvailable = orders.length > 0;

  useEffect(() => {
    // Firestore에서 menuItems 컬렉션 가져오기
    const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      // 메뉴 아이템의 src를 이미지 파일로 매칭
      const menuWithImages = items.map(item => ({
        ...item,
        imageSrc: imageMapping[item.src], // src 필드를 이용해 이미지 매칭
      }));
      
      setMenuItems(menuWithImages);
    };

    fetchMenuItems();
  }, []);

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
      <p className='my-2 w-[90%]'>테이블 번호: {tableId} </p>
      <div className="flex flex-col gap-4 p-2 border border-gray-300 rounded-md z-50 w-[90%]">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Menu
              imageSrc={item.imageSrc}
              name={item.name}
              addOrder={addOrder}
              price={item.price}
              available={item.available} 
            />
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

// src/state/orderState.js
import { atom } from 'recoil';

export const orderState = atom({
  key: 'orderState', 
  default: [], 
});
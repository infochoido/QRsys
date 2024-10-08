// src/state/orderState.js
import { atom } from 'recoil';

export const orderState = atom({
  key: 'orderState', // Unique ID (with respect to other atoms/selectors)
  default: [], // Default value (initial state)
});
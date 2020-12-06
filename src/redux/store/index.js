import { configureStore } from '@reduxjs/toolkit';
import products from '../slices/products.slice';

export default (preloadedState) => configureStore({
  reducer: {
    products
  },
  preloadedState
});
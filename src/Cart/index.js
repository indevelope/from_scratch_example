import React, { useState } from 'react';

import ProductsList from '../Products/ProductsList';

import useProducts from '../hooks/useProducts';

const Cart = () => {
  const products = useProducts();

  const [items, setItems] = useState([]);

  const removeFromCart = (productId) => {
    setItems(items => items.filter(item => item.Id != productId))
  };

  const addToCart = (product) => {
    setItems(items => [...items, product])
  };

  return (
    <div>
      <div>
        <h1 className='font-bold text-4xl'>Cart</h1>
        <CartItems removeFromCart={removeFromCart} items={items} />
      </div>
      <div>
        <ProductsList 
          isLoading={!products}
          addToCart={addToCart} 
          products={products} 
        />
      </div>
    </div>
  );
};

export default Cart;

const CartItems = ({ items, removeFromCart }) => (
  items.length > 0 ?
    <table style={styles.table}>
      <tbody>
        {
          items.map(item => (
            <CartItem key={item.Id} item={item} removeFromCart={removeFromCart} />
          ))
        }
      </tbody>
    </table>
  : <div>Cart is empty</div>
);

const CartItem = React.memo(({ item, removeFromCart }) => (
  <tr>
    <Column>{item.Title}</Column>
    <Column>${item.Price}</Column>
    <Column><button onClick={() => removeFromCart(item.Id)}>Cancel</button></Column>
  </tr>
));

const Column = ({ children }) => (
  <td style={styles.td}>{children}</td>
);

const styles = {
  table: {
    border: '1px solid #222',
    borderCollapse: 'collapse'
  },

  td: {
    border: '1px solid #222',
    padding: '12px'
  }
}
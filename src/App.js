import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import Modal from './Modal.js';

const App = () => {

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // made up of [product, size, num]
  const [total, setTotal] = useState(0);

  const addToCart = (product, size) => {
    let tempCartItems = JSON.parse(JSON.stringify(cartItems));
    
    let alreadyInCart = false;

    for (let i = 0; i < tempCartItems.length; i++){
      if (tempCartItems[i][0].sku === product.sku && tempCartItems[i][1] === size){
        tempCartItems[i][2] = tempCartItems[i][2] + 1;
        alreadyInCart = true;
        break;
      }
    }

    if (alreadyInCart === false){
      tempCartItems.push([product, size, 1]);
    }

    setCartItems(tempCartItems);
    setTotal(total + product.price);
    setCartIsOpen(true);
  }

  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <button className="openModalButton" onClick={() => cartIsOpen === true ? setCartIsOpen(false):setCartIsOpen(true)}>Cart</button>
      {cartIsOpen === true ? <Modal setCartIsOpen={setCartIsOpen} cartItems={cartItems} total={total} />:null}
      <ul>
        {products.map(product => <Card key={product.sku} product={product} addToCart={addToCart} />)}
      </ul>
    </div>
  )
};

export default App;

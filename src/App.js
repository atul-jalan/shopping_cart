import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import Modal from './Modal.js';
import './Global.css';
import './App.css';

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

  const setNewQuantity = (item, quantity) => {

    let tempCartItems = JSON.parse(JSON.stringify(cartItems));

    for (let i = 0; i < tempCartItems.length; i++){
      if (tempCartItems[i][0].sku === item[0].sku && tempCartItems[i][1] === item[1]){

        const changeInPrice = item[0].price * (quantity - tempCartItems[i][2]);
        setTotal(total + changeInPrice);

        if (quantity == 0){ 
          tempCartItems.splice(i, 1);
        } else {
          tempCartItems[i][2] = quantity;
        }
        
        setCartItems(tempCartItems);
        return;
      }
    }
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
      {cartIsOpen === true ? <Modal setCartIsOpen={setCartIsOpen} cartItems={cartItems} total={total} setNewQuantity={setNewQuantity} />:null}

      <div className="appBanner">
        <h1 className="appBannerTitle">Jalan Cart</h1>
        <button className="openModalButton" onClick={() => cartIsOpen === true ? setCartIsOpen(false):setCartIsOpen(true)}>Cart</button>
      </div>
      <div className="appUL">
        {products.map(product => <Card key={product.sku} product={product} addToCart={addToCart} />)}
      </div>
    </div>
  )
};

export default App;

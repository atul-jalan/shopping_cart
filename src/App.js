import React, { useEffect, useState } from 'react';
import firebase from "firebase/app"
import "firebase/database";
import "firebase/auth";

import Card from './Card.js';
import Modal from './Modal.js';
import './Global.css';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDLMn3D--gZDtesqNPSlAp3uF6O_6g-z7o",
  authDomain: "shopping-cart-fc9e9.firebaseapp.com",
  databaseURL: "https://shopping-cart-fc9e9.firebaseio.com",
  projectId: "shopping-cart-fc9e9",
  storageBucket: "shopping-cart-fc9e9.appspot.com",
  messagingSenderId: "117136358560",
  appId: "1:117136358560:web:c92902257a31acd2f45dc5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const App = () => {

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // made up of [product, size, num]
  const [total, setTotal] = useState(0);

  const [inventory, setInventory] = useState([]);

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

    const tempInventory = JSON.parse(JSON.stringify(inventory));
    for (let i = 0; i < tempInventory.length; i++){
      if (tempInventory[i][0] == product.sku){
        if (size === "Small"){
          tempInventory[i][1][0] = tempInventory[i][1][0] - 1;
        } else if (size === "Medium"){
          tempInventory[i][1][1] = tempInventory[i][1][1] - 1;
        } else if (size === "Large"){
          tempInventory[i][1][2] = tempInventory[i][1][2] - 1;
        } else if (size === "Extra Large"){
          tempInventory[i][1][3] = tempInventory[i][1][3] - 1;
        }
        break;
      }
    }

    setInventory(tempInventory);
    setCartItems(tempCartItems);
    setTotal(total + product.price);
    setCartIsOpen(true);
  }

  const setNewQuantity = (item, quantity) => {

    let tempCartItems = JSON.parse(JSON.stringify(cartItems));

    for (let i = 0; i < tempCartItems.length; i++){
      if (tempCartItems[i][0].sku == item[0].sku && tempCartItems[i][1] === item[1]){

        const tempInventory = JSON.parse(JSON.stringify(inventory));
        for (let j = 0; j < tempInventory.length; j++){
          if (tempInventory[j][0] == item[0].sku){
            const changeInQuantity = quantity - tempCartItems[i][2];
            if (item[1] === "Small"){
              if (changeInQuantity > tempInventory[j][1][0]){
                quantity = tempCartItems[i][2] + tempInventory[j][1][0];
                tempInventory[j][1][0] = 0;
              } else {
                tempInventory[j][1][0] = tempInventory[j][1][0] - changeInQuantity;
              }
            } else if (item[1] === "Medium"){
              if (changeInQuantity > tempInventory[j][1][1]){
                quantity = tempCartItems[i][2] + tempInventory[j][1][1];
                tempInventory[j][1][1] = 0;
              } else {
                tempInventory[j][1][1] = tempInventory[j][1][1] - changeInQuantity;
              }
            } else if (item[1] === "Large"){
              if (changeInQuantity > tempInventory[j][1][2]){
                quantity = tempCartItems[i][2] + tempInventory[j][1][2];
                tempInventory[j][1][2] = 0;
              } else {
                tempInventory[j][1][2] = tempInventory[j][1][2] - changeInQuantity;
              }
            } else if (item[1] === "Extra Large"){
              if (changeInQuantity > tempInventory[j][1][3]){
                quantity = tempCartItems[i][2] + tempInventory[j][1][3];
                tempInventory[j][1][3] = 0;
              } else {
                tempInventory[j][1][3] = tempInventory[j][1][3] - changeInQuantity;
              }
            }
            break;
          }
        }
        setInventory(tempInventory);
        const changeInPrice = item[0].price * (quantity - tempCartItems[i][2]);
        setTotal(total + changeInPrice);
        if (quantity == 0){ 
          tempCartItems.splice(i, 1);
        } else {
          tempCartItems[i][2] = quantity;
        }
        setCartItems(tempCartItems);
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

      const HandleData = snap => {
        if (snap.val()) {
          const inventoryJSON = snap.val();
          const tempStock = [];
          for(var keys in inventoryJSON){
            tempStock.push([keys, [inventoryJSON[keys].S, inventoryJSON[keys].M, inventoryJSON[keys].L, inventoryJSON[keys].XL]])
          }
          setInventory(tempStock);
        }
      };
      db.on("value", HandleData, error => alert(error));
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
        {products.map(product => <Card key={product.sku} product={product} addToCart={addToCart} inventory={inventory.find(singleInventory => singleInventory[0] == product.sku)} />)}
      </div>
    </div>
  )
};

export default App;

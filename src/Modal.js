import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({setCartIsOpen, cartItems, total}) => {
    return (
        <div className="modal">
            <button className="modalCloseButton" onClick={() => setCartIsOpen(false)}>X</button>
            <h1 className="modalTitle">Your Cart</h1>
            {cartItems.map(cartItem => <SingleItem key={cartItem[0].sku} item={cartItem} />)}
            <h1 className="modalTotal">Total: {total}</h1>
        </div>
    )
}

const SingleItem = ({item}) => {

    return (
        <div className="modalSingleItem">
            <img className="modalSingleItemImage" src={'./data/products/' + item[0].sku + '_2.jpg'}></img>
            <p>{item[0].title}, Size: {item[1]}, Amount: {item[2]}</p>
        </div>
    )
}

export default Modal;
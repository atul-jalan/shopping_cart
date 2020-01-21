import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({setCartIsOpen, cartItems, total, setNewQuantity}) => {
    return (
        <div className="outerModal">
            <div className="modal">
                <div className="modalBanner">
                    <h1 className="modalTitle">Your Cart</h1>
                    <button className="modalCloseButton" onClick={() => setCartIsOpen(false)}>X</button>
                </div>
                <div className="modalContents">
                    {cartItems.map(cartItem => <SingleItem key={cartItem[0].sku} item={cartItem} setNewQuantity={setNewQuantity} />)}
                </div>
                <h1 className="modalTotal">Total: {total}</h1>
            </div>
        </div>
    )
}

const SingleItem = ({item, setNewQuantity}) => {

    const [itemQuantity, setItemQuantity] = useState(item[2]);

    useEffect(() => {
        if (itemQuantity.toString() === "") {return};

        if (itemQuantity < 0){
            setNewQuantity(item, 0);
        } else {
            setNewQuantity(item, itemQuantity);
        }
    }, [itemQuantity])

    return (
        <div className="modalSingleItem">
            <img className="modalSingleItemImage" src={'./data/products/' + item[0].sku + '_2.jpg'}></img>
            <div className="modalSingleItemDetails">
                <h2 className="singleItemTitle">{item[0].title}</h2>
                <h3 className="singleItemSize">{item[1]}</h3>
                <div className="modalSingleItemQuantity">
                    <h3 className="singleItemQuantityLabel">Quantity: </h3>
                    <input type="number" className="singleItemQuantityInput" value={itemQuantity} onChange={e => setItemQuantity(e.target.value)}></input>
                </div>
            </div>
        </div>
    )
}

export default Modal;
import React, { useEffect, useState } from 'react';
import './Card.css';
import './Global.css';

const Card = ({product, addToCart}) => {

    return (
        <div className="card">
            <img className="cardImage" src={'./data/products/' + product.sku + '_1.jpg'}></img>
            <h2 className="cardTitle">{product.title}</h2>
            <h3 className="cardSubtitle">Price: ${product.price}</h3>
            <div className="cardSizes">
                <button className="cardSizeButton" onClick={() => addToCart(product, "Small")}>S</button>
                <button className="cardSizeButton" onClick={() => addToCart(product, "Medium")}>M</button>
                <button className="cardSizeButton" onClick={() => addToCart(product, "Large")}>L</button>
                <button className="cardSizeButton" onClick={() => addToCart(product, "Extra Large")}>XL</button>
            </div>
        </div>
    )
}

export default Card;
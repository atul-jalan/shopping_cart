import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({product, addToCart}) => {

    return (
        <div class="card">
            <img src={'./data/products/' + product.sku + '_1.jpg'}></img>
            <h2 class="cardTitle">{product.title}</h2>
            <h3 class="cardSubtitle">Price: {product.price}</h3>
            <div class="cardSizes">
                <button class="cardSizeButton" onClick={() => addToCart(product, "Small")}>S</button>
                <button class="cardSizeButton" onClick={() => addToCart(product, "Medium")}>M</button>
                <button class="cardSizeButton" onClick={() => addToCart(product, "Large")}>L</button>
                <button class="cardSizeButton" onClick={() => addToCart(product, "Extra Large")}>XL</button>
            </div>
        </div>
    )
}

export default Card;
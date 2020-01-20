import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({product}) => {

    return (
        <div class="card">
            <img src={'./data/products/' + product.sku + '_1.jpg'}></img>
            <h2 class="cardTitle">{product.title}</h2>
            <h3 class="cardSubtitle">Price: {product.price}</h3>
            <div class="cardSizes">
                <button class="cardSizeButton">S</button>
                <button class="cardSizeButton">M</button>
                <button class="cardSizeButton">L</button>
                <button class="cardSizeButton">XL</button>
            </div>
        </div>
    )
}

export default Card;
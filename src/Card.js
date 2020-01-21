import React, { useEffect, useState } from 'react';
import './Card.css';
import './Global.css';

const Card = ({product, addToCart, inventory}) => {
    return (
        <div className="card">
            <img className="cardImage" src={'./data/products/' + product.sku + '_1.jpg'}></img>
            <h2 className="cardTitle">{product.title}</h2>
            <h3 className="cardSubtitle">Price: ${product.price}</h3>
            <div className="cardSizes">
                {inventory !== undefined && <button className="cardSizeButton" onClick={() => inventory[1][0] > 0 ? addToCart(product, "Small"):null}>S{inventory[1][0] > 0 ? " - " + inventory[1][0] + " left":" - SOLD OUT"}</button>}
                {inventory !== undefined && <button className="cardSizeButton" onClick={() => inventory[1][1] > 0 ? addToCart(product, "Medium"):null}>M{inventory[1][1] > 0 ? " - " + inventory[1][1] + " left":" - SOLD OUT"}</button>}
                {inventory !== undefined && <button className="cardSizeButton" onClick={() => inventory[1][2] > 0 ? addToCart(product, "Large"):null}>L{inventory[1][2] > 0 ? " - " + inventory[1][2] + " left":" - SOLD OUT"}</button>}
                {inventory !== undefined && <button className="cardSizeButton" onClick={() => inventory[1][3] > 0 ? addToCart(product, "Extra Large"):null}>XL{inventory[1][3] > 0 ? " - " + inventory[1][3] + " left":" - SOLD OUT"}</button>}
            </div>
        </div>
    )
}

export default Card;
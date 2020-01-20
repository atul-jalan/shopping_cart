import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({setCartIsOpen}) => {
    return (
        <div className="modal">
            <button className="modalCloseButton" onClick={() => setCartIsOpen(false)}>X</button>
        </div>
    )
}

export default Modal;
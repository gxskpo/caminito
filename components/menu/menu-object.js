import React, { useEffect, useState } from 'react';

export default function MenuObject({ name, price, imageSrc, id, extra = {} , style}) {
    /*
    We will not use this, but I'll leave this thing here and the styles if someone wants to use it or something.

    const [oldPrice, setOldPrice] = useState("");

    useEffect(() => {
        if(extra.oldPrice){
            setOldPrice(extra.oldPrice);
        }
    }, []);
     */

    return (
        <div className="menu-object-cl" id={id} style={style}>
            <img alt="Foto del platillo" src={imageSrc} />
            <h3>{name}</h3>
            {/* <p>${price} {oldPrice && <span className="old-price">${oldPrice}</span>}</p> */}
        </div>
    );
}
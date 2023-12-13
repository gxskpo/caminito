import React, { useEffect, useState } from 'react';

export default function MenuObject({ name, price = null, imageSrc, id , style}) {
    return (
        <div className="menu-object-cl" id={id} style={style}>
            <img alt="Foto del platillo" src={imageSrc} />
            <h3>{name}</h3>
            {<p>{price}</p> ? price : null}
        </div>
    );
}
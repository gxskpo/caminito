import {useEffect, useState} from 'react';
import PlatilloSkeleton from "@/components/menu/obj-skeleton";
import Image from "next/image";

export default function MenuObject({name, price = null, imageSrc, id, style}) {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (imageSrc) {
            setImage(<img alt="Foto del platillo" src={imageSrc} onLoad={handleImageLoad} className='real-image'/>);
        }
    }, [imageSrc]);

    return (
        <div className="menu-object-cl" id={id} style={style}>
            <div className="image-container">
                {<PlatilloSkeleton/> ? loading : null}
                {image}
            </div>
            <h3>{name}</h3>
            {<p>{price}</p> ? price : null}
        </div>
    );
}
import menu from '@/public/menu.json';

export function openDetail({cID, setIDFn}) {
    if (cID < 0 || cID > menu.length) {
        return null;
    }
    setIDFn(cID);
    document.querySelector("#mdj3").style.display = "flex";
    return document.querySelector("#mdj3");
}

export function MenuDetail({cID, currentLang}) {


    const closeDetail = () => {
        document.querySelector("#mdj3").style.display = "none";
    }

    return (
        <div className="menu-detail-container" id="mdj3">
            <div className="menu-item-detail">
                <img className="menu-item-dimg" alt="Foto del platillo" src={menu[cID].imageSrc}/>
                <button className="menu-detail-close" onClick={closeDetail}><i
                    className="fa-regular fa-circle-xmark"></i></button>
                <h1>{menu[cID].name}</h1>
                <p>{menu[cID].description[currentLang]}</p>

                { menu[cID].options ? <h3>Opciones:</h3>  : null }
                <ul>
                    {
                        menu[cID].options ? menu[cID].options.map((option, index) => {
                            return (
                                <li key={index}>{option}</li>
                            )
                        }): null
                    }
                </ul>

            </div>
        </div>
    )

}
import Head from "next/head";
import texts from "@/components/texts";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import {Loader} from "@/components/loader";
import LoadCSS from "@/components/css-loader";
import MenuObject from "@/components/menu/menu-object";
import {useEffect, useState} from "react";
import {MenuDetail, openDetail} from '@/components/menu/detail'
import ChatAssistant from "@/components/menu/chat";
import menu from "@/public/menu.json";


export default function MenuHome() {
    LoadCSS("/css/menu.css")
    const {currentLang, xSetLang} = languageProvider();
    const [cID, setID] = useState(0);
    let courses = {}

    useEffect(() => {
        if (document) {
            document.querySelectorAll(".menu-object-cl").forEach((element) => {
                element.addEventListener("click", () => {
                    openDetail({cID: Number(element.id), setIDFn: setID})
                })
            })
        }


    }, [])


    menu.map((item, index) => {
        let category_name = String(item.category).toLowerCase()

        if (!courses[category_name]) {
            courses[category_name] = []
        }
        courses[category_name].push(
            <MenuObject name={item.name} imageSrc={item.imageSrc} id={index}/>
        )
    })


    const categoryChildren = (category) => {
        let category_name = String(category).toLowerCase()
        return courses[category_name]
    }
    
    return (
        <>
            <Head>
                <title>{texts.Menu.title[currentLang]}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Loader/>
            <TopBar currentPage="menu" currentLang={currentLang} xSetLang={xSetLang}/>
            <MenuDetail cID={cID} currentLang={currentLang}/>
            <ChatAssistant setIDfn={setID}/>
            <div className="menu-main">
                <p>{texts.Menu.currencyNotificationText[currentLang]}</p>
                <h1>{texts.Menu.breakfastsSection.title[currentLang]}</h1>
                <div className="menu-section">
                    {categoryChildren('Platos/Desayuno')}
                </div>
                <h1>{texts.Menu.snkSection.title[currentLang]}</h1>
                <div className="menu-section">
                    {categoryChildren('Snacks')}
                </div>
                <h1>{texts.Menu.mainDishes.title[currentLang]}</h1>
                <div className="menu-section">
                    {categoryChildren('Platos/Fuerte')}
                </div>
                <h1>{texts.Menu.hotDrinks.title[currentLang]}</h1>
                <div className="menu-section">
                    {categoryChildren('Bebidas/Caliente')}
                </div>
                <h1>{texts.Menu.coldDrinks.title[currentLang]}</h1>
                <div className="menu-section">
                    {categoryChildren('Bebidas/Frio')}
                </div>
                {/* I was too lazy to put a proper margin here, so I'll leave this thing here ;)*/}
                <div className="menu-section" style={{
                    height: "10vh"
                }}/>
                <button className="ai-chat-btn" onClick={() => {
                    document.querySelector(".chat-container-bk").style.display = "flex";
                }}><i className="fa-solid fa-comment"></i></button>
            </div>
        </>
    )
}
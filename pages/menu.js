import Head from "next/head";
import texts from "@/components/texts";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import {Loader, hideLoader} from "@/components/loader";
import LoadCSS from "@/components/css-loader";
import MenuObject from "@/components/menu/menu-object";
import {useEffect, useState} from "react";
import P from "@/components/p";
import {MenuDetail, openDetail} from '@/components/menu/detail'


export default function MenuHome() {
    LoadCSS("/css/menu.css")
    const {currentLang, setLang} = languageProvider();
    const [cID, setID] = useState(0);

    useEffect(() => {
        window.setLang = setLang;
        window.hideLoader = hideLoader;
    }, []);

    useEffect(() => {
        if (document) {
            document.querySelectorAll(".menu-object-cl").forEach((element) => {
                element.addEventListener("click", () => {
                    openDetail({cID: Number(element.id), setIDFn: setID})
                })
            })
        }


    }, [])


    return (
        <>
            <Head>
                <title>{texts.Menu.title[currentLang]}</title>
            </Head>
            <Loader/>
            <P/>
            <TopBar currentPage="menu"/>
            <MenuDetail cID={cID}/>
            <div className="menu-main">
                <p>{texts.Menu.currencyNotificationText[currentLang]}</p>
                <h1>{texts.Menu.breakfastsSection.title[currentLang]}</h1>
                <div className="menu-section">
                    <MenuObject name="Huevos al gusto" imageSrc="/images/menu/huevos.png" id={1}/>
                    <MenuObject name="Omelette" imageSrc="/images/menu/omelette.png" id={2}/>
                    <MenuObject name="Molcajetada de huevo" imageSrc="/images/menu/molcajetada-huevo.png" id={3}/>
                    <MenuObject name="Chilaquiles" imageSrc="/images/menu/chilaquiles.png" id={4}/>
                    <MenuObject name="Enfrijoladas" imageSrc="/images/menu/enfrijoladas.png" id={5}/>
                    <MenuObject name="Entomatadas" imageSrc="/images/menu/entomatadas.png" id={6}/>
                    <MenuObject name="Enmoladas" imageSrc="/images/menu/enmoladas.png" id={7}/>
                    <MenuObject name="Enchiladas" imageSrc="/images/menu/enchiladas.png" id={8}/>
                </div>
                <h1>{texts.Menu.snkSection.title[currentLang]}</h1>
                <div className="menu-section">
                    <MenuObject name="Memelitas" imageSrc="/images/menu/memelas.png" id={9}/>
                    <MenuObject name="Empanadas" imageSrc="/images/menu/empadas.png" id={10}/>
                    <MenuObject name="Caldo de fandango" imageSrc="/images/menu/caldo-fandango.png" id={11}/>
                </div>
                <h1>{texts.Menu.mainDishes.title[currentLang]}</h1>
                <div className="menu-section">
                    <MenuObject name="Molcajetada de chorizo" imageSrc="/images/menu/molcajetada-chorizo.png" id={12}/>
                    <MenuObject name="Mole de pollo" imageSrc="/images/menu/pollo-con-mole.png" id={13}/>
                    <MenuObject name="Tasajo a la mexicana" imageSrc="/images/menu/tasajo-amc.png" id={14}/>
                    <MenuObject name="Tasajo encebollado" imageSrc="/images/menu/tasajo-cb.png" id={15}/>
                    <MenuObject name="Pechuga de pollo" imageSrc="/images/menu/pechuga-de-perro.jpeg" id={16}/>
                </div>
                <h1>{texts.Menu.hotDrinks.title[currentLang]}</h1>
                <div className="menu-section">
                    <MenuObject name="Café de olla" imageSrc="/images/menu/cafeol.png" id={17}/>
                    <MenuObject name="Café con leche" imageSrc="/images/menu/cafe-leche.png" id={18}/>
                    <MenuObject name="Chocolate de agua" imageSrc="/images/menu/chocolate.png" id={19}/>
                    <MenuObject name="Chocolate de leche" imageSrc="/images/menu/chocolate-lech.png" id={20}/>
                    <MenuObject name="Té" imageSrc="/images/menu/tea.png" id={21}/>
                    <MenuObject name="Agua p/nescafé" imageSrc="/images/menu/agua-jot.png" id={22}/>
                    <MenuObject name="Leche p/nescafé" imageSrc="/images/menu/leche-hot.png" id={23}/>
                    <MenuObject name="Atole" imageSrc="/images/menu/atole.png" id={24}/>
                </div>
                <h1>{texts.Menu.coldDrinks.title[currentLang]}</h1>
                <div className="menu-section">
                    <MenuObject name="Refrescos" imageSrc="/images/menu/refrescos.png" id={25}/>
                    <MenuObject name="Agua de fruta" imageSrc="/images/menu/agua-fruta.png" id={26}/>
                    <MenuObject name="Licuados" imageSrc="/images/menu/licuados.png" id={27}/>
                    <MenuObject name="Micheladas" imageSrc="/images/menu/micheladas.png" id={28}/>
                    <MenuObject name="Mezcal" imageSrc="/images/menu/mezcal.png" id={29}/>
                </div>
                {/* I was too lazy to put a proper margin here, so I'll leave this thing here ;)*/}
                <div className="menu-section" style={{
                    height: "10vh"
                }}/>
                <button className="ai-chat-btn"><i className="fa-solid fa-comment"></i></button>
            </div>
        </>
    )
}
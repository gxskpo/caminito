import texts from "@/components/texts";
import languageProvider from "@/components/language";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function TopBar({currentPage}) {
    const {currentLang, xSetLang} = languageProvider();
    const router = useRouter();
    const whatsapp_url = process.env.NEXT_PUBLIC_WHATSAPP_URL;


    const toggleMenu = () => {
        const menu = document.querySelector(".main-menu");
        if (menu.style.display !== "block") {
            menu.style.animation = "menu_opacity_in 0.2s linear"
            menu.style.display = "block";
        } else {
            menu.style.animation = "menu_opacity_out 0.2s linear"
            setTimeout(() => {
                menu.style.display = "none";
            }, 190)
        }
    }

    useEffect(() => {
        let currentPageElement = document.querySelector(`#tpb_${currentPage}`)
        currentPageElement.classList.add("current-page");
        currentPageElement.onclick = () => {};


    }, []);

    const handleSetLang = (e) => {
        let value = e.target.value;
        xSetLang(value)
    }


    return (
        <>
            <div className="topbar">
                <h1>{texts.global.topBar.title[currentLang]}</h1>
                <button onClick={toggleMenu}><i className="fa-solid fa-bars"></i></button>
            </div>
            <div className="main-menu">
                <div className="menu-buttons">
                    <button onClick={() => {
                        router.push("/")
                    }} id="tpb_home">{texts.global.topBar.home[currentLang]}
                    </button>

                    <button onClick={() => {
                        router.push("/sucursales")
                    }} id="tpb_branches">{texts.global.topBar.branches[currentLang]}
                    </button>

                    <button onClick={() => {
                        router.push("/menu")
                    }} id="tpb_menu">{texts.global.topBar.menu[currentLang]}
                    </button>

                    <button className="whatsapp-btn" onClick={() => {
                        router.push(whatsapp_url)
                    }}><i className="fa-brands fa-whatsapp"></i> Whatsapp
                    </button>

                    <select defaultValue={currentLang} onChange={handleSetLang}>
                        <option value="es">🇲🇽Español</option>
                        <option value="en">🇺🇸Inglés</option>
                        <option value="de">🇩🇪Deutsch</option>

                    </select>

                    <button onClick={() => {
                        router.push("/about")
                    }} id="tpb_about">{texts.global.topBar.about[currentLang]}
                    </button>
                </div>
            </div>
        </>
    )
}
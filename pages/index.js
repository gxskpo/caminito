import Head from 'next/head';
import {useRouter} from 'next/router'
import texts from "@/components/texts";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import LoadCSS from "@/components/css-loader";
import {Loader} from "@/components/loader";

export default function Home() {
    const router = useRouter();
    const {currentLang, xSetLang} = languageProvider();
    LoadCSS("/css/home.css")

    return (
        <>
            <Head>
                <title>
                    {texts.Home.title[currentLang]}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Loader/>
            <TopBar currentPage="home" currentLang={currentLang} xSetLang={xSetLang}/>
            <div className="background-image-sec-one">
                <div className="top-section">
                    <h1>Caminito al cielo</h1>
                    <p>{texts.Home.description[currentLang]}</p>
                    <button className='go-menubnt' onClick={() => {
                        router.push("/menu")
                    }}><i className="fa-solid fa-utensils"></i> {texts.Home.viewMenuButton[currentLang]}</button>
                    <button className='go-branches' onClick={() => {
                        router.push("/sucursales")
                    }}><i className="fa-solid fa-map"></i> {texts.Home.viewLocationsButton[currentLang]}</button>
                    <br/>
                    <button className='source-code' onClick={() => {
                        router.push("https://github.com/gxskpo/caminito")
                    }}><i className="fa-brands fa-github"></i> {texts.Home.viewSourceCodeButton[currentLang]}</button>
                </div>
            </div>
        </>
    )
}
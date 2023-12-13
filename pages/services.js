import texts from '@/components/texts'
import LoadCSS from "@/components/css-loader";
import Head from 'next/head'
import LanguageProvider from "@/components/language";
import {Loader} from "@/components/loader";
import TopBar from "@/components/topbar";

export default function Services() {
    LoadCSS('css/home.css');
    const {currentLang, xSetLang} = LanguageProvider();
    const wa_url = process.env.NEXT_PUBLIC_WHATSAPP_URL;


    return (
        <>
            <Head>
                <title>{texts.Services.title[currentLang]}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Loader/>
            <TopBar currentPage="services" currentLang={currentLang} xSetLang={xSetLang}/>
            <div className="background-image-sec-one">
                <div className="top-section">
                    <h1>{texts.Services.h1[currentLang]}</h1>
                    <p>{texts.Services.description[currentLang]}</p>
                    <button className='go-menubnt' onClick={() => {
                        router.push(wa_url)
                    }}><i className="fa-brands fa-square-whatsapp"></i> {texts.Services.getInTouch[currentLang]}</button>
                </div>
            </div>
        </>
    )
}
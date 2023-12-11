import Head from "next/head";
import {useRouter} from "next/router";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import texts from "@/components/texts";
import LoadCSS from "@/components/css-loader";
import {Loader} from "@/components/loader";

export default function About() {
    const router = useRouter();
    const {currentLang, xSetLang} = languageProvider();
    LoadCSS("/css/about.css")
    return (
        <>
            <Head>
                <title>{texts.AboutUs.title[currentLang]}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Loader/>
            <TopBar currentPage="about" currentLang={currentLang} xSetLang={xSetLang}/>
            <div className="about-us">
                <h1>{texts.AboutUs.aboutCommerce.h1[currentLang]}</h1>
                <p>{texts.AboutUs.aboutCommerce.description[currentLang]}</p>
            </div>
            <div className="about-website">
                <h1>{texts.AboutUs.aboutDeveloper.h1[currentLang]}</h1>
                <p>{texts.AboutUs.aboutDeveloper.description[currentLang]}</p>
                <button className="source-code" onClick={() => {
                    router.push("https://github.com/gxskpo/caminito")
                }}><i className="fa-brands fa-github"></i> {texts.AboutUs.aboutDeveloper.sourceCodeButton[currentLang]}</button>
            </div>
            <div style={{height: "20vh"}}/>
        </>
    )
}
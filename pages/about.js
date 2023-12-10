import Head from "next/head";
import {useRouter} from "next/router";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import P from "@/components/p";

export default function About() {
    const router = useRouter();
    const {currentLang, setLang} = languageProvider();

    return (
        <>
            <Head>
                <title>Menú</title>
                <link rel="stylesheet" href="/css/about.css"/>
            </Head>
            <P/>
            <TopBar currentPage="about"/>
            <div className="about-us">
                <h1>Acerca de nosotros</h1>
                <p>Nosotros somos una familia de emprendedores en el negocio restaurantero para dar a conocer el sazón
                    hogareño, ofrecemos una experiencia degustativa inigualable de platillos tradicionales del valle de
                    Oaxaca, con el sazón de la familia.</p>
            </div>
            <div className="about-website">
                <h1>Acerca de esta página web</h1>
                <p>
                    Hola aquí! Esta página web fue creada con Next.js, y ¡es de código abierto! Puedes ver el código
                    presionando el botón abajo, esta página web fue creada como un proyecto para la clase de Informática.
                </p>
                <button>Source code</button>

            </div>
            <div style={{height: "20vh"}}/>
        </>
    )
}
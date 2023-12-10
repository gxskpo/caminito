import Head from "next/head";
import {useRouter} from "next/router";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import P from "@/components/p";


export default function Sucursales() {
    const router = useRouter();
    const {currentLang, setLang} = languageProvider();

    return (
        <>
            <Head>
                <title>Sucursales</title>
                <link rel="stylesheet" href="/css/sucursales.css"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <P/>
            <TopBar currentPage="branches"/>
            <div className="branches-list">
                <div className="branch-detail">
                    <h3>Tlacolula</h3>
                    <p>Carretera Internacional Km 30, Col. 12 de mayo, Tlacolula, Oaxaca</p>
                    <button className="map-button" onClick={() => {
                        router.push("https://maps.app.goo.gl/XFTWx6qhNEyQ4RVA9")
                    }}><i className="fa-solid fa-location-dot"></i> Ver en google maps</button>
                </div>
                <div className="branch-detail">
                    <h3>Teotitlán del Valle</h3>
                    <p>Av. Juarez s/n, frente al centro de salud, Teotitlán del Valle, Tlacolula, Oax.</p>
                    <button className="map-button" onClick={() => {
                        router.push("https://www.google.com/maps/place/Restaurant+El+Arte+Teotiteco")
                    }}><i className="fa-solid fa-location-dot"></i> Ver en google maps</button>
                </div>

            </div>


        </>
    )
}
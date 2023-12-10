import {useEffect, useState} from "react";
import Head from 'next/head';
import {useRouter} from 'next/router'
import texts from "@/components/texts";
import languageProvider from "@/components/language";
import TopBar from "@/components/topbar";
import P from '@/components/p'

export default function Home() {
    const router = useRouter();
    const {currentLang, setLang} = languageProvider();


    return (
        <>
            <Head>
                <title>
                    {texts.Home.title[currentLang]}
                </title>
                <link rel="stylesheet" href="/css/home.css"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <P />
            <TopBar currentPage="home"/>
            <div className="background-image-sec-one">
                <div className="top-section">
                    <h1>Caminito al cielo</h1>
                    <button className='go-menubnt'>Ver menú</button>
                    <button className='go-branches'>Ver sucursales</button>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>

        </>
    )

}
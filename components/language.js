import {useEffect, useState} from "react";

export default function LanguageProvider() {
    const [currentLang, setLang] = useState('');
    useEffect(() => {
        let selectedLang = sessionStorage.getItem("lang");
        if (!selectedLang) {
            let userLang = navigator.language.substring(0, 2);
            if (["es", "en", "de"].includes(userLang)) {
                setLang(userLang);
            }
        } else {
            setLang(selectedLang);
        }
    }, []);
    const xSetLang = (lang) => {
        let newLang;
        if (["es", "en", "de"].includes(lang)) {
            console.log("First check passed");
            newLang = lang;
        } else {
            newLang = "en";
        }
        setLang(newLang);
        sessionStorage.setItem('lang', newLang);
    };
    return {currentLang: currentLang, xSetLang: xSetLang};
}
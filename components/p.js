import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function P() {
    const router = useRouter();
    const [widgetStyle, setStyle] = useState({display: "none"});
    useEffect(() => {
        if (window && window.innerWidth > 768) {
            setStyle({
                display: "block",
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: 99999999,
                backgroundColor: "white",
                textAlign: "center",
                paddingTop: "50px",
                fontFamily: "Poppins"
            })
        }
    }, []);

    return null; /*(
        <div style={widgetStyle}>
            <i className="fa-solid fa-poo" style={{fontSize: "3em", color: "#7C4F38FF"}}></i>
            <i className=""></i>
            <h1>This page is only available for mobile devices.</h1>
            <p>We are improving the desktop UI. We apologize for any inconveniences.</p>
            <button style={{
                padding: "2vh",
                border: "none",
                cursor: "pointer",
                borderRadius: "15px"
            }} onClick={() => {
                router.push("https://github.com/gxskpo/restaurant-webpage")
            }}><i className="fa-brands fa-github"></i> Source code
            </button>
        </div>
    ) */

}
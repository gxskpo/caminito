import {hideLoader} from "@/components/loader";
import {useEffect} from "react";

export default function LoadCSS(url) {
    useEffect(() => {
        const head = document.head;
        let link = document.createElement("link")
        link.href = url;
        link.rel = "stylesheet";
        head.appendChild(link)
        link.onload = hideLoader;
    }, []);
}
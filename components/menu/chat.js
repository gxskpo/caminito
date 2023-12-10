import React, {useState, useEffect, useRef} from "react";
import menu from '@/public/menu.json';
import {openDetail} from "@/components/menu/detail";

function MenuEmbed({cID, setItem}) {
    const initialItemRef = useRef(menu[cID] || {});

    useEffect(() => {
        // Realiza cualquier acción adicional al cambiar cID si es necesario
    }, [cID]);

    const completeView = () => {
        document.querySelector(".chat-container-bk").style.display = "none";
        const detail = document.querySelector("#mdj3");
        if (detail) {
            openDetail({cID: cID, setIDFn: setItem});
        }
    };

    const itemID = initialItemRef.current.id;
    const itemName = initialItemRef.current.name;
    const itemImageSrc = initialItemRef.current.imageSrc;

    return (
        <div className="menu-message-embed" onClick={completeView}>
            <img src={itemImageSrc} alt={itemName}/>
            <div className="menu-message-embed-info">
                <h3>{itemName}</h3>
            </div>
        </div>
    );
}

function ChatMessage({content, sender, time, setIDfn}) {
    // Time must be a UNIX timestamp
    const message_id = time + sender;
    let clean_content;
    let embeds = [];
    // Detect if the message have some kind of [item:<number>]
    // If it does, replace it with info (menu)

    const itemRegex = /\[item:([0-9]+)\]/g;
    const itemMatch = content.match(itemRegex);

    if (itemMatch) {
        itemMatch.forEach((item) => {
            const itemID = item.replace("[item:", "").replace("]", "");
            // replace it with the embed
            embeds.push(<MenuEmbed cID={itemID} setItem={setIDfn}/>);
            // remove it from 'content'
            clean_content = content.replace(item, '');
        })
    } else {
        clean_content = content;
    }


    return (
        <div className={`chat-message ${embeds && embeds.length > 0 ? 'has-embed' : ''}`} id={message_id}>
            <h3 className="chat-message-sender">{sender}</h3>
            <p className="chat-message-content">{clean_content}</p>
            {embeds && embeds.length > 0 ? embeds : null}
        </div>
    )
}


export default function ChatAssistant({setIDfn}) {
    const [messages, setMessages] = useState([]);
    const json_messages = [];

    const submitMessage = async (message) => {
        console.log(messages)
        console.log(json_messages)
        json_messages.push({
            'role': 'user',
            'content': message
        });
        setMessages((prevMessages) => [
            ...prevMessages,
            <ChatMessage content={message} sender="user" time={Date.now()} setIDfn={setIDfn} />,
        ]);

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({messages: json_messages}),
        });
        if (response.ok) {
            const responseData = await response.json();
            json_messages.push({
                'role': 'assistant',
                'content': responseData.data.choices[0].message.content
            });
            setMessages((prevMessages) => [...prevMessages, (
                <ChatMessage content={responseData.data.choices[0].message.content} sender="chatGPT"
                             time={Date.now()} setIDfn={setIDfn}/>)])
        } else {
            console.error("Error en la solicitud HTTP:", response.statusText);
        }

    }

    const closeChat = () => {
        document.querySelector(".chat-container-bk").style.display = "none";
    }


    const onInput = async (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            await submitMessage(event.target.value);
            event.target.value = "";
        }
    }

    const onSend = async () => {
        let input = document.querySelector(".chat-input input");
        if (input.value === "") return;
        await submitMessage(input.value);
        input.value = "";
    }

    return (
        <div className="chat-container-bk">

            <div className="chat-container">
                <div className="chat-header">
                    <h1>Chat</h1>
                    <p>Powered by AI</p>
                </div>
                <button className="chat-close" onClick={closeChat}><i className="fa-regular fa-circle-xmark"></i>
                </button>
                <div className="chat-messages">
                    {messages ? messages : null}
                </div>
                <div className="chat-input">
                    {/* Need to change onKeyPress because is deprecated*/}
                    <input type="text" placeholder="Type something here..."  onKeyUp={onInput}/>

                    <button onClick={onSend}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )

}
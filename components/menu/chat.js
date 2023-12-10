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
    clean_content = clean_content.replace(itemRegex, '');

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

    const disableInputs = () => {
        document.querySelector(".chat-input input").disabled = true;
        let button = document.querySelector(".chat-input button");
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-ellipsis fa-beat-fade"></i>';
    }

    const enableInputs = () => {
        let textInput = document.querySelector(".chat-input input");
        textInput.disabled = false;
        textInput.focus();
        let button = document.querySelector(".chat-input button");
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    }


    const submitMessage = async (message) => {
        console.log(messages)
        console.log(json_messages)
        json_messages.push({
            'role': 'user',
            'content': message
        });
        setMessages((prevMessages) => [
            ...prevMessages,
            <ChatMessage content={message} sender="user" time={Date.now()} setIDfn={setIDfn}/>,
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
                <ChatMessage content={responseData.data.choices[0].message.content} sender="Nero"
                             time={Date.now()} setIDfn={setIDfn}/>)])
            enableInputs();
            setTimeout(() => {
                const chatMessages = document.querySelector(".chat-messages");
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 0);
        } else {
            console.error("Error en la solicitud HTTP:", response.statusText);
        }
    }

    const closeChat = () => {
        document.querySelector(".chat-container-bk").style.display = "none";
    }


    const onInput = async (event) => {
        if (event.key === "Enter" && event.target.value !== "") {
            disableInputs();
            await submitMessage(event.target.value);
            event.target.value = "";
        }
    }

    const onSend = async () => {
        let input = document.querySelector(".chat-input input");
        if (input.value === "") return;
        disableInputs();
        await submitMessage(input.value);
        input.value = "";
    }

    return (
        <div className="chat-container-bk">

            <div className="chat-container">
                <div className="chat-header">
                    <h1>Chat</h1>
                    <p>Powered by <a href="https://github.com/gxskpo/caminito">ChatGPT</a></p>
                </div>
                <button className="chat-close" onClick={closeChat}><i className="fa-regular fa-circle-xmark"></i>
                </button>
                <div className="chat-messages">
                    {messages ? messages : null}
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Type something here..." onKeyUp={onInput}/>
                    <button onClick={onSend}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )

}
import SockJsClient from "react-stomp";
import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "../App";

const SOCKET_URL = 'http://localhost:8080/alumni';

function Notification() {
    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const [tags, setTags] = useState(['/topic/javascript', '/topic/java']);

    let onMessageReceived = (msg) => {
        messages.push(msg);
        setMessages(messages);
    }

    useEffect(() => {
        axios.get(`/api/users/${user.type}/${user.email}`).then(response => {
            if (response.data && response.data.tags.length > 0) {
                setTags(response.data.tags.map(tag => `/topic/${tag.name}`));
            }
        });
    }, [])

    return (
        <SockJsClient
            url={SOCKET_URL}
            topics={tags}
            onConnect={console.log("Connected!")}
            onDisconnect={console.log("Disconnected!")}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
        />
    )
}

export default Notification;

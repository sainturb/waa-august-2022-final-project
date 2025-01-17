import SockJsClient from "react-stomp";
import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useAuth} from "../../App";
import Toast from "./Toast";

const SOCKET_URL = 'http://localhost:8080/alumni';

function Notification() {
    const {user} = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [tags, setTags] = useState(['/topic/javascript', '/topic/java']);

    const onMessageReceived = (message) => {
        const notification =  {message};
        setNotifications([...notifications, notification]);
    }

    useEffect(() => {
        axios.get(`/api/users/${user.type}/${user.email}`).then(response => {
            if (response.data && response.data.tags.length > 0) {
                setTags(response.data.tags.map(tag => `/topic/${tag.name}`));
            }
        });
    }, [])

    return (
        <>
           <div className="relative ">
               <div className="absolute top-0 right-0 z-10">
                   {
                       notifications.map((message, index) => {
                           return (
                               <Toast>
                                   <div key={message + index}
                                        id="toast-simple"
                                        className="z-10 flex mb-2 items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                                        role="alert">
                                       <svg aria-hidden="true" className="w-5 h-5 text-blue-600 dark:text-blue-500" focusable="false"
                                            data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                           <path fill="currentColor"
                                                 d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path>
                                       </svg>
                                       <div className="pl-4 text-sm font-normal">{message.message}</div>
                                   </div>
                               </Toast>
                           )
                       })
                   }
               </div>
           </div>
            <SockJsClient
                url={SOCKET_URL}
                topics={tags}
                onConnect={console.log("Connected!")}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
        </>
    )
}

export default Notification;

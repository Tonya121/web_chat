import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import OwnMessage from "../message/OwnMessage";
import Message from "../message/Message";

import instance from "../../utils/api";

import { styles } from "./styles";

let socket;

const Chat = ({ ownUser, partner }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
       
            const fetchData = async () => {
                const result = await instance.get(`/messages`)
                setData(result);
            };

            fetchData();
    }, [data]);
    const email = localStorage.getItem("user");

    const classes = styles();
    return (
        <>
            {data &&
                data.map((message) => (
                    <div className={classes.wrap}>
                        {message.user.email !== email && (
                            <div className={classes.messageLeft}>
                                <div className={classes.messageSection}>
                                    <AccountCircleIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                    <OwnMessage
                                        author={partner.name}
                                        partner={partner}
                                        message={message.text}
                                    />
                                    <DoneIcon />
                                </div>
                            </div>
                        )}
                        {message.user.email === email && (
                            <div className={classes.messageRight}>
                                <div className={classes.messageSection}>
                                    <AccountCircleIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                    <Message
                                        message={message.text}
                                        author={ownUser.name}
                                        partner={partner}
                                    />
                                    <DoneAllIcon />
                                </div>
                            </div>
                        )}
                        
                    </div>
                ))}
        </>
    );
};

export default Chat;

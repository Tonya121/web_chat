import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Avatar from "@material-ui/core/Avatar";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";

import OwnMessage from "../message/OwnMessage";
import Message from "../message/Message";
import MessageForm from "../form/MessageForm";

import { styles } from "./styles";

let socket;

const Chat = ({ ownUser }) => {
    const classes = styles();
    return (
        <>
            <div className={classes.wrap}>
                <div className={classes.messageLeft}>
                    <div className={classes.messageSection}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/broken-image.jpg"
                            className={classes.orange}
                        >
                            B
                        </Avatar>
                        <OwnMessage />
                        <DoneIcon />
                    </div>
                </div>

                <div className={classes.messageRight}>
                    <div className={classes.messageSection}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/broken-image.jpg"
                            className={classes.orange}
                        >
                            X
                        </Avatar>
                        <Message />
                        <DoneAllIcon />
                    </div>
                </div>
            </div>
            <div className={classes.formWrap}>
                <MessageForm />
            </div>
        </>
    );
};

export default Chat;

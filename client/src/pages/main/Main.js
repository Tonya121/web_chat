import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Chat from "../../components/chat/Chat";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageForm from "../../components/form/MessageForm";

import instance from "../../utils/api";

import { styles } from "./styles";

const Main = ({ data }) => {
    const [partner, setPartner] = useState({});
    const [dialog, setDialog] = useState([]);
    const [state, setState] = useState("");
    
    let history = useHistory();

    const user = localStorage.getItem("user");
    const ownUser = data && data.find((item) => item.email === user);

    const classes = styles();

    const openDialog = async (user) => {
        history.push(`/dialog/${user._id}`);
        setPartner(user);
        const newDialog = {
            author: ownUser._id,
            partner: partner._id,
        };

        if (!partner) {
            await instance
                .post(`/dialogs`, newDialog)
                .then((response) => setDialog(response));
        }

        await instance
            .get(`/messages?dialog=${user._id}`)
            .then((dialog) => setDialog(dialog));
    };

    const submitMessage = async (evt) => {
        evt.preventDefault();
        setState("");
        if (ownUser._id) {
            const newMessage = {
                text: state,
                author: ownUser._id,
                user: user._id
            };
            await instance
                .post(`/messages?dialog=${partner._id}`, newMessage)
                .then((data) => console.log(data));
        }
    };

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState(value);
    };

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                <Sidebar data={data} openDialog={openDialog} />
            </div>
            {dialog.length ? (
                <div className={classes.content}>
                    <div className={classes.wrap}>
                        <Chat ownUser={ownUser} partner={partner} />
                        <div className={classes.formWrap}></div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <MessageForm
                submitMessage={submitMessage}
                handleChange={handleChange}
                state={state}
            />
        </div>
    );
};

export default Main;

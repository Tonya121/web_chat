import React from "react";

import Chat from "../../components/chat/Chat";
import Sidebar from "../../components/sidebar/Sidebar";

import { styles } from "./styles";

const Main = ({ data }) => {
    const user = localStorage.getItem("user");
    const ownUser = data && data.find(item => item.email === user);
    const classes = styles();
    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                <Sidebar data={data} />
            </div>
            <div className={classes.content}>
                <Chat ownUser={ownUser} />
            </div>
        </div>
    );
};

export default Main;

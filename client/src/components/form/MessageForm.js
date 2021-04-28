import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";

import { styles } from "./styles";

const MessageForm = () => {
    const classes = styles();
    return (
        <form className={classes.formMessage}>
            <TextField fullWidth label="Write message" />
            <IconButton color="primary" aria-label="message">
                <AddCircleIcon />
            </IconButton>
        </form>
    );
};

export default MessageForm;

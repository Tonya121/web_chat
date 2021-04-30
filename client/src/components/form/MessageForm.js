import React from "react";

import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";

import { styles } from "./styles";

const MessageForm = ({ submitMessage, handleChange, state }) => {
    const classes = styles();
   
    return (
        <form onSubmit={submitMessage} className={classes.formMessage}>
            <TextField
                fullWidth
                label="Write message"
                value={state}
                name="text"
                onChange={handleChange}
            />
            <IconButton type="submit" color="primary" aria-label="message">
                <AddCircleIcon />
            </IconButton>
        </form>
    );
};

export default MessageForm;

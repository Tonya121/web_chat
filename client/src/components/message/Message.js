import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { styles } from "./styles";

const Message = () => {
    const classes = styles();
    return (
        <Paper className={classes.paper}>
            <Typography variant="body2" component="p">
                some message answer
            </Typography>
        </Paper>
    );
};

export default Message;

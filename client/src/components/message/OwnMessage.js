import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { styles } from "./styles";

const OwnMessage = () => {
    const classes = styles();
    return (
        <Paper className={classes.message}>
            <Typography variant="body2" component="p">
                some message
            </Typography>
        </Paper>
    );
};

export default OwnMessage;

import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { styles } from "./styles";

const OwnMessage = ({ message, author }) => {
    const classes = styles();
    return (
        <div>
            <Paper className={classes.message}>
                <Typography variant="body2" component="p">
                    {message}
                </Typography>
            </Paper>
            <Typography variant="body2" component="p">
                {author}
            </Typography>
        </div>
    );
};

export default OwnMessage;

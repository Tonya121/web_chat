import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { styles } from "./styles";

const Sidebar = ({ data }) => {
    const classes = styles();

    return (
        <List className={classes.root}>
            {data &&
                data.map((user) => (
                    <>
                        <ListItem key={user.name}>
                            <ListItemAvatar>
                                <AccountCircleIcon
                                    color="primary"
                                    fontSize="large"
                                />
                            </ListItemAvatar>
                            <ListItemText primary={`${user.name}`} />
                        </ListItem>
                        <Divider />
                    </>
                ))}
        </List>
    );
};

export default Sidebar;

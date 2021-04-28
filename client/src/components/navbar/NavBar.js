import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { styles } from "./styles";

export default function NavBar({ user }) {
    const classes = styles();

    const menuId = "primary-search-account-menu";

    const mobileMenuId = "primary-search-account-menu-mobile";

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Chat
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.wrap}>
                        <Typography
                            className={classes.title}
                            variant="body2"
                            component="p"
                            noWrap
                        >
                            {user}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            //   onClick={}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            //   onClick={}
                            color="inherit"
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

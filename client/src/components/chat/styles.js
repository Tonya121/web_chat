import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
    orange: {
        backgroundColor: theme.palette.info.main,
        margin: "0 10px",
    },
    messageSection: {
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "40%",
        padding: "0 20px",
        margin: "10px",
    },
    messageRight: {
        display: "flex",
        justifyContent: "flex-end"
    },
    messageLeft: {
        display: "flex",
        justifyContent: "flex-start"
    },
    formWrap: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderTop: "2px solid #bdbdbd",
    },
}));

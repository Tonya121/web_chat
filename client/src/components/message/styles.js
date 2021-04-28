import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
    message: {
        color: "#fff",
        backgroundColor: theme.palette.info.main,
        display: "flex",
        alignItems: "center",
        padding: "5px 14px",
    },
    paper: {
        color: "#fff",
        backgroundColor: theme.palette.text.secondary,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
    }
}));

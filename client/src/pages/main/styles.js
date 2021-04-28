import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100%",
    },
    sidebar: {
        width: "20%",
        borderRight: "2px solid #bdbdbd",
        height: "100%",
    },
    content: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 10
    },
}));

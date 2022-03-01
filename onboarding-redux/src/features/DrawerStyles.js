import { makeStyles } from "@mui/styles";

export const useDeleteDrawerStyles = makeStyles((theme) => ({
    /* root: {
        padding: theme.spacing(2),
    }, */
    actions: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        "& > * + *": {
            /* marginLeft: theme.spacing(2), */
        },
    },
    buttonIcon: {
        /* marginRight: theme.spacing(1), */
    },
}));

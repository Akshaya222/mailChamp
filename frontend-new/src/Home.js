import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import FormLabel from "@material-ui/core/FormLabel";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

// dialog
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Edit from "./Edit";
import FutureMails from "./FutureMails";
const useStyles = makeStyles({
  createBody: {
    textAlign: "center!important",
    paddingTop: "5%",
    color: "#ededed"
  },
  bodyText: {
    display: "flex",
    justifyContent: "center"
  }
});

// dialog
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function CreateArea() {
  const classes = useStyles();
  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home-page">
      <Navbar />
      <div>
        <Typography variant="h3" gutterBottom className={classes.createBody}>
          WELCOME!
        </Typography>
        <div className={classes.bodyText}>
          <Typography
            variant="body1"
            gutterBottom
            style={{ width: "60%" }}
            className={classes.createBody}
          >
            Create and send E-mails to your friends or audience in one go!
            Schedule E-mails every 30 seconds, weekly, monthly or yearly as per
            your choice. Make your emails look better by styling them. Create
            and Schedule and E-mail now!
          </Typography>
        </div>

        <div className="createBtn" onClick={handleClickOpen}>
          <Button variant="contained" color="secondary" size="large">
            CREATE
          </Button>
        </div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Create Mail
          </DialogTitle>
          <DialogContent dividers>
            <Edit />
          </DialogContent>
        </Dialog>

        <br />
        {/* <hr className="divider" /> */}
        <Typography variant="h4" gutterBottom className={classes.createBody}>
          MAILS SCHEDULED
        </Typography>

      <FutureMails />
      </div>
    </div>
  );
}

export default CreateArea;

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
import FormLabel from "@material-ui/core/FormLabel";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const useStyles=makeStyles({
    createBody:{
        textAlign:'center!important',
        paddingTop:'5%',
         color: '#ededed'
    },
    bodyText:{
       display: 'flex',
       justifyContent:'center'
    }
})


function CreateArea() {

  const classes=useStyles();

  return (
    <div className="home-page">
    <Navbar/>
    <div>
      <Typography variant="h3"  gutterBottom  className={classes.createBody} >
        WELCOME!
      </Typography>
      <div className={classes.bodyText}>
      <Typography variant="body1" gutterBottom style={{width:'60%'}} className={classes.createBody}>
        Create and send E-mails to your friends or audience in one go! Schedule
        E-mails every 30 seconds, weekly, monthly or yearly as per your choice.
        Make your emails look better by styling them. Create and Schedule and
        E-mail now!
      </Typography>
      </div>
      <div className="createBtn">
        <Button variant="contained" color="secondary" size="large">
          CREATE
        </Button>
      </div>
      <br />
      {/* <hr className="divider" /> */}
      <Typography variant="h4"  gutterBottom className={classes.createBody}>
        MAILS SCHEDULED
      </Typography>

      <List className="list" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText className="list" primary="RECURRING MAILS" />
          <br />
        </ListItem>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <Paper className="paper" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Divider />

        <ListItem button>
          <ListItemText className="list" primary="WEEKLY MAILS" />
        </ListItem>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <Paper className="paper" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <ListItem button>
          <ListItemText className="list" primary="MONTHLY MAILS" />
        </ListItem>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <Paper className="paper" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Divider light />
        <ListItem button>
          <ListItemText className="list" primary="YEARLY MAILS" />
        </ListItem>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {[0, 1, 2, 3, 4].map((value) => (
                <Grid key={value} item>
                  <Paper className="paper" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </List>
    </div>
    </div>
  );
}

export default CreateArea;
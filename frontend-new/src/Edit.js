import React, { useState } from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { navigate } from "@reach/router";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import {Typography} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormatColorTextIcon from "@material-ui/icons/FormatColorText";

const types = [
  {
    value: "recurring",
    label: "Recurring"
  },
  {
    value: "weekly",
    label: "Weekly"
  },
  {
    value: "monthly",
    label: "Monthly"
  },
  {
    value: "yearly",
    label: "Yearly"
  }
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  menuPaper: {
    maxHeight: 300
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
    paddingTop: 10
  }
}));

function Edit() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("black");
  const [font, setFont] = useState("Arial");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [fontType, setFontType] = useState("normal");
  const [err,setErr]=useState("");
  const [msg,setMsg]=useState("");

  const [mailInput, setMailInput] = useState({
    type: "",
    to: "",
    cc: "",
    subject: "",
    body: ""
  });
  const [mail, setMail] = useState({
    type: "",
    to: "",
    cc: "",
    subject: "",
    body: ""
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setMailInput((prevValue) => {
      return {
        ...prevValue,

        [name]: value
      };
    });
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickHandler = (event) => {
    event.preventDefault();
    setMail(mailInput);
    let user=JSON.parse(sessionStorage.getItem("user"));
    let str = `<div style='color:${color};font-family:${font};font-style:${
      italic ? "italic" : "normal"
    };font-weight:${bold ? "bold" : "normal"}'>${mailInput.body}</div>`;
    // console.log("str is", str);

    if (mailInput.type === "recurring") {
      console.log(mail.to,mail.cc,mail.subject,str,mailInput);
      axios
      .post(`https://nodejs-mailchamp-2233.herokuapp.com/auth/sendRecMails/${user._id}`, {
        to: mail.to,
        cc: mail.cc,
        subject: mail.subject,
        body: str,
        message: mailInput.body
      })
      .then((res)=>{
        setMsg("");
        setErr("");
        setMsg(res.data.message);
        console.log(res.data.message)
    }).catch((err)=>{
        setMsg("");
        setErr("");
        setErr(err.response.data.message)
        console.log(err.response.data.message);
    })
    } else if (mailInput.type === "weekly") {
    //   console.log("week");
      axios
      .post(` 
      https://nodejs-mailchamp-2233.herokuapp.com/auth/sendWekMails/${user._id}`, {
        to: mail.to,
        cc: mail.cc,
        subject: mail.subject,
        body: str,
        message: mailInput.body
      })
      .then((res)=>{
        setMsg("");
        setErr("");
        setMsg(res.data.message);
        console.log(res.data.message)
    }).catch((err)=>{
        setMsg("");
        setErr("");
        setErr(err.response.data.message)
        console.log(err.response.data.message);
    })
    } else if (mailInput.type === "monthly") {
      console.log("month");
      axios
      .post(` 
      https://nodejs-mailchamp-2233.herokuapp.com/auth/sendMonMails/${user._id}`, {
        to: mail.to,
        cc: mail.cc,
        subject: mail.subject,
        body: str,
        message: mailInput.body
      })
      .then((res)=>{
        setMsg("");
        setErr("");
        setMsg(res.data.message);
        console.log(res.data.message)
    }).catch((err)=>{
        setMsg("");
        setErr("");
        setErr(err.response.data.message)
        console.log(err.response.data.message);
    })
    } else if (mailInput.type === "yearly") {
    //   console.log("yearc");
      axios
      .post(` 
      https://nodejs-mailchamp-2233.herokuapp.com/auth/sendYeaMails/${user._id}`, {
        to: mail.to,
        cc: mail.cc,
        subject: mail.subject,
        body: str,
        message: mailInput.body
      })
     .then((res)=>{
        setMsg("");
        setErr("");
        setMsg(res.data.message);
        console.log(res.data.message)
    }).catch((err)=>{
        setMsg("");
        setErr("");
        setErr(err.response.data.message)
        console.log(err.response.data.message);
   })
    }
    // setMailInput({
    //   type: "",
    //   to: "",
    //   cc: "",
    //   subject: "",
    //   body: ""
    // });

    // axios
    //   .post("http://localhost:3007/auth/sendmails/60d5a5eef35bd356333f0773", {
    //     to: "bhavyatripathi00@gmail.com",
    //     cc: "18bcs017@iiitdwd.ac.in",
    //     subject: "testing the route",
    //     body: str,
    //     message: mailInput.body
    //   })
    //   .then((data) => {
    //     console.log("response from backend", data);
    //   })
    //   .catch((err) => {
    //     console.log("error from backend", err);
    //   });
  };
  const changeColor = (event) => {
    setColor(event.target.value);
  };
  const changeFont = (event) => {
    setFont(event.target.value);
  };
  const changeBold = () => {
    setBold(!bold);
  };
  const changeItalic = () => {
    setItalic(!italic);
  };

  return (
    <div>
      <form autoComplete="off">
        {/* {console.log(mailInput)} */}
        {/* {console.log("FINAL INPUT ", mail)} */}
        <Typography variant="h6" align="center" style={{color:'green',margin:msg?'3px 0px':null}}>{msg?msg:null}</Typography>
          <Typography variant="h6" align="center" style={{color:'red',margin:err?'3px 0px':null}}>{err?err:null}</Typography>

        <div className={classes.to}>
          <Input
            className={classes.textField}
            onChange={handleChange}
            type="email"
            name="to"
            value={mailInput.to}
            placeholder="To"
            inputProps={{ "aria-label": "description" }}
          />
        </div>
        <div>
          <Input
            className={classes.textField}
            type="email"
            onChange={handleChange}
            name="cc"
            value={mailInput.cc}
            placeholder="CC"
            inputProps={{ "aria-label": "description" }}
          />
        </div>
        <div>
          <Input
            className={classes.textField}
            onChange={handleChange}
            name="subject"
            value={mailInput.subject}
            placeholder="Subject"
            inputProps={{ "aria-label": "description" }}
          />
        </div>
        <Button onClick={handleClickOpen} title="Text Colour">
          <FormatColorTextIcon />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Choose a colour</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl
                variant="filled"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={color}
                  onChange={changeColor}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                  <MenuItem value="navy">Blue</MenuItem>
                  <MenuItem value="deeppink">Pink</MenuItem>
                  <MenuItem value="forestgreen">Green</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <FormControl size="small" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={font}
            onChange={changeFont}
            MenuProps={{ classes: { paper: classes.menuPaper } }}
          >
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Times New Roman ">Times New Roman</MenuItem>
            <MenuItem value="Courier New">Courier New</MenuItem>
            <MenuItem value="Lucida Console">Lucida Console</MenuItem>
            <MenuItem value="Brush Script MT">Brush Script MT</MenuItem>
            <MenuItem value="Garamond">Garamond</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={changeItalic} title="Italics">
          <FormatItalicIcon />
        </Button>
        <Button onClick={changeBold} title="Bold">
          <FormatBoldIcon />
        </Button>
        <div>
          <textarea
            className={classes.textField}
            style={{
              color: color,
              fontFamily: font,
              fontStyle: italic ? "italic" : "normal",
              fontWeight: bold ? "bolder" : "normal",
              width:"100%",
              fontSize:"18px"
            }}
            name="body"
            placeholder="Write a message..."
            rows={10}
            value={mailInput.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            id="standard-select-schedule"
            name="type"
            defaultValue={{ label: "Recurring", value: "recurring" }}
            label="Schedule"
            select
            value={mailInput.type}
            onChange={handleChange}
            helperText="Please select your schedule"
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <br />
        <div>
          <Button
            onClick={clickHandler}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Edit;

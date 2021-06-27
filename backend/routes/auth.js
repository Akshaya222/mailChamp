const router=require('express').Router()
const signin=require('../controllers/signin');
const signup=require("../controllers/signup")
const mail=require("../controllers/mail");

const {auth}=require('../helpers/middlerwares/isLoggedIn');

router.post("/signup-username",signup.signUpWithUsername);
router.post("/signup-google",signup.signUpWithGoogle);

router.put("/login-username",signin.signInWithUsername);
router.put("/login-google",signin.signInWithGoogle)

router.post("/sendRecMails/:userId",mail.recurringMail);
router.post("/sendWekMails/:userId",mail.scheduleEveryWeek);
router.post("/sendMonMails/:userId",mail.scheduleEveryMonth);
router.post("/sendYeaMails/:userId",mail.scheduleEveryYear);

router.get("/getRecurringMails/:userId",mail.getRecurringMails);
router.get("/getWeeklyMails/:userId",mail.getWeeklyMails);
router.get("/getMonthlyMails/:userId",mail.getMonthlyMails);
router.get("/getYearlyMails/:userId",mail.getYearlyMails);



module.exports=router;

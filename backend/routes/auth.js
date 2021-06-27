const router=require('express').Router()
const signin=require('../controllers/signin');
const signup=require("../controllers/signup")
const mail=require("../controllers/mail");

const {auth}=require('../helpers/middlerwares/isLoggedIn');

router.post("/signup-username",signup.signUpWithUsername);
router.post("/signup-google",signup.signUpWithGoogle);

router.put("/login-username",signin.signInWithUsername);
router.put("/login-google",signin.signInWithGoogle)

router.post("/sendRecMails/:userId",auth,mail.recurringMail);
router.post("/sendWekMails/:userId",auth,mail.scheduleEveryWeek);
router.post("/sendMonMails/:userId",auth,mail.scheduleEveryMonth);
router.post("/sendYeaMails/:userId",auth,mail.scheduleEveryYear);

router.get("/getRecurringMails/:userId",auth,mail.getRecurringMails);
router.get("/getWeeklyMails/:userId",auth,mail.getWeeklyMails);
router.get("/getMonthlyMails/:userId",auth,mail.getMonthlyMails);
router.get("/getYearlyMails/:userId",auth,mail.getYearlyMails);



module.exports=router;

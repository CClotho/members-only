const express = require('express');
const router = express.Router();
const   validate = require('../middlewares/ValidationResult');
const  FormValidation = require("../middlewares/FormValidation");
const {SetUser, isAdmin} = require('../middlewares/SetUser');
const logRegisterController = require('../controllers/LogRegisterController')

/* Free for all routes */

router.get('/sign-up', logRegisterController.getSignUpForm);

router.post('/sign-up',
FormValidation, 
validate,logRegisterController.SignUp);

router.get('/login',logRegisterController.getLoginForm );

router.post('/login',logRegisterController.Login)

router.use((SetUser));


router.get('/', logRegisterController.getMessages);



router.post('/logout',logRegisterController.Logout)



module.exports = router;

const express = require('express');
const router = express.Router();
const {checkRole, isMember} = require('../middlewares/SetUser');
const userController = require('../controllers/userController');
const PostValidation = require('../middlewares/PostValidation');
const checkClubPassword = require('../middlewares/ClubValidation');
const validate = require('../middlewares/ValidationResult');


router.get('/', function(req, res, next)  {
  
  
  res.render('example');
});

/* All kinds of users */

router.get('/clubhouse', checkRole, isMember,userController.getClubhouse)

router.post('/clubhouse', checkRole, isMember, checkClubPassword,validate, userController.JoinClubhouse);


router.get('/post', checkRole,userController.getPostForm);


router.post('/post',
checkRole, 
PostValidation, 
validate, 
userController.createPost);

module.exports = router;

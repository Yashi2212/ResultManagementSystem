const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const studentController= require('../controllers/studentController')

router.get('/',studentController.index);
router.get('/student/login',studentController.login);
router.post('/student/login',studentController.loginpost);
// router.get('/student/result',auth.ensureStToken,studentController.result);
router.get('/logout',studentController.logout);

module.exports=router;

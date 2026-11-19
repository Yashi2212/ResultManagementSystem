const express = require('express');
const router = express.Router();
const teacherController= require('../controllers/teacherController');
const auth=require('../middleware/auth');

router.get('/',teacherController.index);
router.get('/teacher/login',teacherController.login);
router.post('/teacher/login',teacherController.loginpost);

router.get('/teacher/add',auth.ensureToken,teacherController.add);
router.post('/teacher/add',auth.ensureToken,teacherController.postadd);

router.get('/teacher/home',auth.ensureToken,teacherController.home);
router.get('/teacher/home/:id',auth.ensureToken,teacherController.delete);

router.get('/teacher/edit/:id',auth.ensureToken,teacherController.getedit);
router.post('/teacher/edit/:id',auth.ensureToken,teacherController.postedit);
router.get('/logout',teacherController.logout);



module.exports=router;

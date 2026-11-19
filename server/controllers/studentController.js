const sessionSecret = require('../config/session-secret');
const mongoose=require('mongoose');
const Student=require('../models/studentmodel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth =require('../middleware/auth');
require('../config/db');
const jwt=require('jsonwebtoken');


exports.index=async(req,res)=>{
    const locals={
        title:'Result Management System',
        description:'Result Management System NodeJS'
    }
    res.render('index', { message: req.flash('message') });
}

exports.login=async(req,res)=>{
    const locals={
        title:'Result Management System',
        description:'Result Management System NodeJS'
    }
   
    res.render('student/login',locals);
}



exports.loginpost= async(req,res)=>{
try{
    console.log("Welcome to Login");
    const {rollno,dob}=req.body;
    const stud=await Student.findOne({rollno,dob});
    console.log(stud);
    if(!stud) {
        return res.status(401).redirect('/teacher/login');
    }
    else{
    const token =jwt.sign({rollno:stud.rollno,role:stud.role},sessionSecret,{expiresIn:'1h'});
    console.log({token});
    const inputdate= stud.dob;
    console.log("Date to be format"+inputdate);
    const day = String(inputdate.getDate()).padStart(2, '0');
    const month = String(inputdate.getMonth() + 1).padStart(2, '0'); // January is 0, hence +1
    const year = inputdate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    // console.log("Formatted date is:"+formattedDate);
    // if(stud ){
    //     req.session.studtroll=studtroll;
    //     res.render('student/result',{val:studtroll,date:formattedDate});
    // }
    // else{
    //     req.flash('error_msg', 'Something went wrong!');
    //     res.render('student/login');
    // }
    res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
   return res.render('student/result',{val:stud,date:formattedDate});
}
}
catch(error){
    req.flash('error_msg', 'Username of Password is incorrect!');
    console.error(error);
    res.render("student/login");

    }

}

exports.result=async(req,res)=>{
    const locals={
        title:'Result Management System',
        description:'Result Management System NodeJS'
    }
   
    res.render('student/result',locals);
}

exports.logout=async(req,res)=>{
    const locals={
        title:'Result Management System',
        description:'Result Management System NodeJS'
    }
    res.clearCookie('token').redirect('/');
    console.log("Student Logout");

}
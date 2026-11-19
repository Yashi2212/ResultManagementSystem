const sessionSecret = require('../config/session-secret');
const Teacher=require('../models/teachermodel');
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
   
    res.render('index', { message: req.flash('message') ,locals});
}


exports.login=async(req,res)=>{
    const locals={
        title:'Result Management System',
        description:'Result Management System NodeJS'
    }
    res.render('teacher/login');
}


exports.loginpost= async(req,res)=>{
    try{
    const {userid,password}=req.body;
    const teacher=await Teacher.findOne({userid,password});
    if(!teacher) {
        return res.status(401).redirect('/teacher/login');
    }
    else{
        //token
    const token =jwt.sign({id:teacher._id,role:teacher},sessionSecret,{expiresIn:'1h'});
    console.log({token});
        let datearr = [];
        const studentdata= await Student.find();
            for(let i=0; i<studentdata.length; i++) {
                let inputdate= studentdata[i].dob;
                const day = String(inputdate.getDate()).padStart(2, '0');
                const month = String(inputdate.getMonth() + 1).padStart(2, '0'); // January is 0, hence +1
                const year = inputdate.getFullYear();
                const formattedDate = `${day}-${month}-${year}`; 
                datearr.push(formattedDate);
            } 
           res.cookie('token',token,{
            maxAge:3600000,
            httpOnly:true
           });
            return res.render('teacher/home', {studentdata, datearr});
        }

            }
    catch(error){
        console.log(error);
    }
}




exports.add=async(req,res)=>{
    const studentdata= await Student.find();
    const locals={
        title:'Add Student',
        description:'Result Management System NodeJS'
    }
   
    res.render('teacher/add');
}

// post 
// add student form
exports.postadd= async (req,res) => {
    console.log(req.body);

    console.log(req.body.dob+"lets see ");
    const newStudent=new Student({
        rollno: req.body.rollno,
        name:req.body.name,
        dob:req.body.dob,
        score:req.body.score
    });
    try
    {
        await Student.create(newStudent);
         success=true;
         const studentdata= await Student.find();
         console.log(studentdata);
if (success) {
    req.flash('success_msg', 'Student Added Successfully!!');
    res.redirect('/teacher/add');
    
  } else {
    req.flash('error_msg', 'Something went wrong!');
    res.redirect('/teacher/add');
  }        
    } 
    catch(error)
    {
        req.flash('error_msg', `Student Rollno: ${newStudent.rollno} Already Exists, Please Enter New One !`);
        res.redirect('/teacher/add');
        console.log(error);

    }
}


exports.home=async(req,res)=>{

   const studentdata= await Student.find();
   let datearr = [];   
       for(let i=0; i<studentdata.length; i++) {
           let inputdate= studentdata[i].dob;
           const day = String(inputdate.getDate()).padStart(2, '0');
           const month = String(inputdate.getMonth() + 1).padStart(2, '0'); // January is 0, hence +1
           const year = inputdate.getFullYear();
           const formattedDate = `${day}-${month}-${year}`; 
           datearr.push(formattedDate);
       }
    const locals={
        title:'Add Student',
        description:'Result Management System NodeJS'
    }
    res.render('teacher/home',{studentdata,datearr,locals});

}

exports.getedit=async(req,res)=>{
try{
    const studentdata= await Student.find();
    const stud= await Student.findOne({_id:req.params.id});
    const formattedDate = formatDate(stud.dob);
        res.render('teacher/edit', { stud, studentdata, formattedDate });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


exports.postedit= async (req,res) => 
{
try{
    console.log(req.body.rollno);
    const updatedStudent=  await Student.findByIdAndUpdate({_id:req.params.id},
        {
        
        rollno: req.body.rollno,
        name: req.body.name,
        dob: req.body.dob,
        score: req.body.score,
        updatedAt: Date.now()
    });
         studentdata= await Student.find();

         let inputdate= updatedStudent.dob;
         const day = String(inputdate.getDate()).padStart(2, '0');
         const month = String(inputdate.getMonth() + 1).padStart(2, '0'); // January is 0, hence +1
         const year = inputdate.getFullYear();
         const formattedDate = `${day}-${month}-${year}`;
         console.log("Inside Post Edit"+formattedDate)
            res.redirect(`/teacher/edit/${req.params.id}`);
            console.log('redirected');
    } catch (error) {
        console.log(error);
    }
}
   


exports.delete=async(req,res)=>{
    // res.redirect('/teacher/home');
    try{
        await Student.deleteOne({_id:req.params.id});
        const studentdata= await Student.find();
        let datearr = [];
        const locals={
        title:'Add Student',
        description:'Result Management System NodeJS'
    }
    for(let i=0; i<studentdata.length; i++) {
        let inputdate= studentdata[i].dob;
        const day = String(inputdate.getDate()).padStart(2, '0');
        const month = String(inputdate.getMonth() + 1).padStart(2, '0'); // January is 0, hence +1
        const year = inputdate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`; 
        datearr.push(formattedDate);
    } 
        res.render("teacher/home",{studentdata,datearr});
    }
    catch(error){
        console.log(error);
    }
}


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function formatDates(data) {
    return data.map(entry => formatDate(entry.dob));
}

exports.logout = async(req, res) => {
    // req.session.destroy(); // Clear the session
res.clearCookie('token').redirect('/');
    // res.redirect("/"); // Redirect to login page after logout
  
  };
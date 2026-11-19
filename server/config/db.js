const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
const connectDB=async()=>{
    try{



        
        // mongoose.set('strictQuery',false);          
        const conn=await mongoose.connect(process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
              });
        console.log(`Successfully Connected to database: ${conn.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
}
module.exports=connectDB;
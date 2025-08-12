import mongoose, { connect } from 'mongoose';
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongoDb");
    }
    catch(error)
    {
        console.log("Error occured",error.message);
    }
}
export default connectToMongoDB;
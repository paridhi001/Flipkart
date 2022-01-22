import mongoose  from "mongoose";



const Connection =  async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@myntraclone.xwqyb.mongodb.net/DATABASES?retryWrites=true&w=majority`
    try{
     await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true});
     console.log('DataBase Connected Successfully.');
    } catch(error) {
        console.log('Error: ', error.message);
    }
 }
export default Connection;
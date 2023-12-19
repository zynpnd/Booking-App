import mongoose from "mongoose";

const conn = () =>{
    mongoose.connect("mongodb://127.0.0.1:27017/",{
        dbName:"booking",
    }).then(()=>{
        console.log("Veritabanı bağlantısı başarılı")
    }).catch((err) =>{
        console.log(err);
    })
}

export default conn;
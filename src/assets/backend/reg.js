import mongoose from "mongoose";


const regschema=new mongoose.Schema({
    name: String,
    email: String,
    pass: String
});
const regmodel=mongoose.model("regs",regschema)
export default regmodel;
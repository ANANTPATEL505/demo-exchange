import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
    id: String,
    name: String,
    Symbol: String
  });
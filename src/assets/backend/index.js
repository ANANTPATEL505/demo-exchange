import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import regmodel from "./reg.js";
import brimodel from "./bridge.js";


const app =express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/first")

app.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;

        // Log the received request data for debugging
        console.log("Login request data:", { email, pass });

        const user = await regmodel.findOne({ email: email });

        if (!user) {
            console.log("No user found for email:", email);
            return res.status(404).json("No record exists");
        }

        if (user.pass !== pass) {
            console.log("Incorrect password for user:", email);
            return res.status(401).json("Password is incorrect");
        }

        res.json("success");
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json("Server error");
    }
});

app.post('/reg',(req,res) =>{
    regmodel.create(req.body)
    .then(reg => res.json(reg))
    .catch(err => res.json(err))
})

app.post('/bridge',(req,res) =>{
    brimodel.create(req.body)
    .then(bri => res.json(bri))
    .catch(err => res.json(err))
    
})





const tokenSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true }, // Add symbol field
  });
  
  const Token = mongoose.model('Token', tokenSchema);
  
  // API endpoint to get token data
// Get all token data from the database
app.get('/api/tokens', async (req, res) => {
    try {
      const tokens = await Token.find();
      res.json(tokens); // Return all tokens
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  // API endpoint to insert a new token
  app.post('/api/tokens', async (req, res) => {
    const { id, name, symbol } = req.body;
  
    // Validate the data
    if (!id || !name || !symbol) {
      return res.status(400).json({ message: 'Please provide all required fields: id, name, symbol' });
    }
  
    try {
      const newToken = new Token({ id, name, symbol }); // Assuming 'Token' is your Mongoose model
      await newToken.save(); // Save the token to the database
      res.status(201).json(newToken); // Return the newly added token
    } catch (error) {
      res.status(500).json({ message: 'Error adding token to database', error });
    }
  });
  
  app.put('/api/tokens/:id', async (req, res) => {
    const { name, symbol, id } = req.body;
  
    try {
      const updatedToken = await Token.findByIdAndUpdate(
        req.params.id,
        { name, symbol, id },
        { new: true } // Return the updated document
      );
      if (!updatedToken) return res.status(404).json({ message: 'Token not found' });
      res.status(200).json(updatedToken);
    } catch (error) {
      res.status(500).json({ message: 'Error updating token', error });
    }
  });

  app.delete('/api/tokens/:id', async (req, res) => {
    try {
      const deletedToken = await Token.findByIdAndDelete(req.params.id);
      if (!deletedToken) return res.status(404).json({ message: 'Token not found' });
      res.status(200).json({ message: 'Token deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting token', error });
    }
  });
  
app.listen(3000,() => {
    console.log("server is running")
})
import mongoose from "mongoose";

const brichema = new mongoose.Schema({
    selectedChain: { type: Object, required: true }, // Adjust type if necessary
    selectedChain2: { type: Object, required: true }, // Adjust type if necessary
    selectedToken1: { type: Object, required: true }, // Adjust type if necessary
    selectedToken2: { type: Object, required: true }, // Adjust type if necessary
    amountToken1: { type: Number, required: true }, // Assuming this is a number
    amountToken2: { type: Number, required: true }, // Assuming this is a number
});

const brimodel = mongoose.model("bridge", brichema);
export default brimodel;

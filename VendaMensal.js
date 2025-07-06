import mongoose, { mongo } from "mongoose";


const VendaMensalSchema = new mongoose.Schema({
    item: String,
    valor: Number
});

export default mongoose.model('VendaMensal', VendaMensalSchema);


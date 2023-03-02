import mongoose from "mongoose";

const citiesSchema = mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  photo: { type: String, required: true },
  population: { type: Number, required: true },
  fundation: { type: Date, required: true },
  description: { type: String, required: true },
});

const Cities = mongoose.model("Cities", citiesSchema);
export default Cities;

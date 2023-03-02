import mongoose from "mongoose";

const itinerarySchema = mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  city: { type: mongoose.Types.ObjectId, ref: "Cities", required: true },
  price: { type: Number, required: true },
  likes: { type: Array },
  dutarion: { type: Number, required: true },
});

const Itinerary = mongoose.model("Itineraries", itinerarySchema);
export default Itinerary;

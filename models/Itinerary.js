import mongoose from "mongoose";

const itinerarySchema = mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  city: { type: mongoose.Types.ObjectId, ref: "cities", required: true },
  price: { type: Number, required: true },
  likes: { type: Array },
  dutarion: { type: Number, required: true },
});

const Itinerary = mongoose.model("itineraries", itinerarySchema);
export default Itinerary;

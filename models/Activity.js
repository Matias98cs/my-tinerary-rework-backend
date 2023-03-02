import mongoose from "mongoose";

const activityShema = mongoose.Schema({
  name: { type: String, required: true },
  photo: { typeof: String, required: true },
  itinerary: {
    type: mongoose.Types.ObjectId,
    ref: "Itineraries",
    required: true,
  },
});

const Activity = mongoose.model("Activities", activityShema);
export default Activity;

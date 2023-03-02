import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  itinerary: {
    type: mongoose.Types.ObjectId,
    ref: "Itineraries",
    required: true,
  },
});

const Comment = mongoose.Model("Comments", commentSchema);
export default Comment;

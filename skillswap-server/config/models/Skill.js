const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skillOffered: { type: String, required: true },
  skillNeeded: { type: String, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillSchema);

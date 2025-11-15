const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftSchema = new Schema(
  {
    originalEmail: {
      type: Schema.Types.ObjectId,
      ref: "Email",
      unique: true, // Only one draft for each email
      required: true,
    },
    subject: {
    type: String,
    default: "",
   },
    draftBody: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "urgent", // Always urgent drafts
    },
    status: {
      type: String,
      enum: ["pending", "edited", "sent"],
      default: "pending",
    },

    sentAt: {
      type: Date,
    },
  },
  { timestamps: true } // Automatically creates createdAt & updatedAt
);

const Draft = mongoose.model("Draft", draftSchema);
module.exports = Draft;

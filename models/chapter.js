const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    ChapterId: {
      type: String,
    },
    Chapter: {
      type: String,
    },
    SubjectId: {
      type: String,
      required: true,
    },

    CreatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

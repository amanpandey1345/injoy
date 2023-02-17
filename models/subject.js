const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    SubjectId: {
      type: String,
    },
    Subject: {
      type: String,
    },

    CreatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

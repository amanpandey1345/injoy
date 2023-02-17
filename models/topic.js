const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    TopicId: {
      type: String,
    },
    Topic: {
      type: String,
    },

    ChapterId: {
      type: String,
      required: true,
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

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);

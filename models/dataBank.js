const mongoose = require("mongoose");

const databankSchema = new mongoose.Schema(
  {
    QuesId: {
      type: String,
    },
    Ques: {
      type: String,
    },
    QuesImg: {
      type: String,
    },
    Op1: {
      type: String,
    },
    Op1Img: {
      type: String,
    },
    Op2: {
      type: String,
    },
    Op2Img: {
      type: String,
    },
    Op3: {
      type: String,
    },
    Op3Img: {
      type: String,
    },
    Op4: {
      type: String,
    },
    Op4Img: {
      type: String,
    },
    Ans: {
      type: String,
    },

    desc: {
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
    TopicId: {
      type: String,
      required: true,
    },
    CreatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DataBank || mongoose.model("DataBank", databankSchema);

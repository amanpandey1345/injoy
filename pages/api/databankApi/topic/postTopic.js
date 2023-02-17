import dataBase from "../../../../config/database";
import Topics from "../../../../models/topic";
const crypto = require("crypto");

dataBase();

const handler = async (req, res, props) => {
  // CreatedBy,SubjectId,ChapterId,Topic,TopicId
  const { method } = req;
  // const CreatedBy = "Chetan";
  const Id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
  const TopicId = `Top${Id}`;
  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." });
  }
  const { Topic, ChapterId, SubjectId,CreatedBy,} = req.body;

  // console.log(Subject);

  const topic = await Topics.create({
    CreatedBy,
    SubjectId,
    ChapterId,
    Topic,
    TopicId
  });

  res.status(201).json({
    success: true,
    topic,
    message: "Topic is Added sccessfully ",
  });
};
export default handler;

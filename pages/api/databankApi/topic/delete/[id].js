import dataBase from "../../../../../config/database";
import Topics from "../../../../../models/topic";

dataBase();

const handler = async (req, res) => {
  // console.log(props.pageProps.statusCode);
  const { method } = req;
  const { id } = req.query;

  if (method !== "DELETE") {
    return res
      .status(400)
      .json({ success: false, message: "Only DELETE requests are allowed." });
    // console.log("sorry!!");
  }

  const topic = await Topics.findOne({TopicId:id}); 
  if (!topic) {
    return res
    .status(400)
    .json({ success: false, message: `User does not exist with Id: ${id}` });
  }
  await topic.remove();

  res.status(201).json({
    success: true,
    message: " sccessfully ",
  });
};
export default handler;

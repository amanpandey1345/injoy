import dataBase from "../../../../config/database";
import DataBank from "../../../../models/dataBank";
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

  const getQuestion = await DataBank.findOne({QuesId:id});
  if (!getQuestion) {
    return res
    .status(400)
    .json({ success: false, message: `User does not exist with Id: ${id}` });
  }
  await getQuestion.remove()
  res.status(201).json({
    success: true,
    message: " sccessfully ",
  });
};
export default handler;

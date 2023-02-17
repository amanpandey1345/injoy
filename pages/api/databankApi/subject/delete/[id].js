import dataBase from "../../../../../config/database";
import Subjects from "../../../../../models/subject";
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

  const subjectd = await Subjects.findOne({SubjectId:id});
  if (!subjectd) {
    return res
    .status(400)
    .json({ success: false, message: `User does not exist with Id: ${id}` });
  }
  // console.log(subjectd);
  await subjectd.remove();

  res.status(201).json({
    success: true,
    message: " sccessfully ",
  });
};
export default handler;

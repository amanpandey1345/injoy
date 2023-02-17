import dataBase from "../../../../../config/database";
import Chapters from "../../../../../models/chapter";
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

  const chapter = await Chapters.findOne({ChapterId:id});
  

  
  if (!chapter) {
    return res
    .status(400)
    .json({ success: false, message: `User does not exist with Id: ${id}` });
  }
  await chapter.remove();

  res.status(201).json({
    success: true,
    message: " sccessfully ",
  });
};
export default handler;

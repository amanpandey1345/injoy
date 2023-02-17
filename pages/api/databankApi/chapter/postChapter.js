import dataBase from "../../../../config/database";
import Chapters from "../../../../models/chapter";
const crypto = require("crypto");

dataBase()



const handler = async (req,res,props) =>{
// CreatedBy,SubjectId,Chapter,ChapterId
  const {method} = req;
  // const CreatedBy = "Chetan"
  const Id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
  const ChapterId = `Ch${Id}`;
  if(method !== "POST"){
      return res.status(400).json({success:false, message:"Only POST requests are allowed."})

  }
  const {  Chapter,CreatedBy,SubjectId } = req.body;

  // console.log(Subject);


  const chapter = await Chapters.create({   CreatedBy, ChapterId, Chapter,SubjectId});

  res.status(201).json({
      success: true,
      chapter,
      message: "Chapter is Added sccessfully ",
    });

}
export default handler;
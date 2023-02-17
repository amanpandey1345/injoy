import dataBase from "../../../config/database";
import DataBank from "../../../models/dataBank";
const crypto = require("crypto");

dataBase()


const handler = async (req,res,props) =>{

  const {method} = req;
  // const CreatedBy = "Chetan" 
  const Id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
  const QuesId = `Q${Id}`;
  if(method !== "POST"){
      return res.status(400).json({success:false, message:"Only POST requests are allowed."})

  }
  const {  Ques, Op1, Op2,Op3,Op4,QuesImg,Op1Img,Ans,Op2Img, Op3Img,Op4Img,desc,ChapterId,SubjectId,TopicId,CreatedBy } = req.body;

  if (!Ques || !Op1|| !Op3||!Op4||!Ans|| !CreatedBy) {
      return res.status(400).json({success:false, message:"Please Enter All Required Field"})
    }

  const question = await DataBank.create({  CreatedBy,QuesId, Ques, Op1, Op2,Op3,Op4,QuesImg,Op1Img,Ans,Op2Img, Op3Img,Op4Img,desc,ChapterId,SubjectId,TopicId });

  res.status(201).json({
      success: true,
      question,
      message: "Question is Added sccessfully ",
    });

}
export default handler;

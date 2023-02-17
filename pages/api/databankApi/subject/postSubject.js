import dataBase from "../../../../config/database";

import Subjects from "../../../../models/subject";
const crypto = require("crypto");

dataBase()



const handler = async (req,res,props) =>{
// CreatedBy,Subject,SubjectId
  const {method} = req;
  // const CreatedBy = "Chetan"
  const Id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
  const SubjectId = `Sub${Id}`;
  if(method !== "POST"){
      return res.status(400).json({success:false, message:"Only POST requests are allowed."})

  }
  const {  Subject,CreatedBy } = req.body;

  console.log(Subject);


  const subject = await Subjects.create({   CreatedBy, SubjectId, Subject});

  res.status(201).json({
      success: true,
      subject,
      message: "Subject is Added sccessfully ",
    });

}
export default handler;

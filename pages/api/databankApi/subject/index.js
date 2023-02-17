import dataBase from "../../../../config/database";

import Subjects from "../../../../models/subject";

dataBase()



const handler = async (req,res,props) =>{

  const {method} = req;

  if(method !== "GET"){
      return res.status(400).json({success:false, message:"Only GET requests are allowed."})

  }


  const subject = await Subjects.find();

  res.status(201).json({
      success: true,
      subject,
      message: " sccessfully ",
    });

}
export default handler;
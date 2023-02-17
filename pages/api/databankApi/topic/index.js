import dataBase from "../../../../config/database";
import Topics from "../../../../models/topic";

dataBase()



const handler = async (req,res,props) =>{

  const {method} = req;

  if(method !== "GET"){
      return res.status(400).json({success:false, message:"Only GET requests are allowed."})

  }


  const topic = await Topics.find();

  res.status(201).json({
      success: true,
      topic,
      message: " sccessfully ",
    });

}
export default handler;
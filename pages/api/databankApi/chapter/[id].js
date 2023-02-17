import dataBase from "../../../../config/database";
import Chapters from "../../../../models/chapter";


dataBase()

const handler = async (req, res) => {
  // console.log(props.pageProps.statusCode);
  const { method } = req;
  const { id } = req.query; 



    if(method !== "GET"){
        return res.status(400).json({success:false, message:"Only GET requests are allowed."})
  
    }
  
  
    const chapter = await Chapters.find({SubjectId:id});
  
    res.status(201).json({
        success: true,
        chapter,
        message: " sccessfully ",
      });
  
  }
  export default handler;
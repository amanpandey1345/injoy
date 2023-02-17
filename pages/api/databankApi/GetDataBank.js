import dataBase from "../../../config/database";
import DataBank from "../../../models/dataBank";
const crypto = require("crypto");

dataBase()


// const getClass = async (req, res, next) => {
//     const classes = await Class.find({ user: req.user._id });
  
//     res.status(200).json({
//       success: true,
//       classes,
//     });
//   };


// const getAllClasses = async (req, res, next) => {
//     // return next(new ErrorHander("This is My TESting Error",500))
  
//     const classes = await Class.find();
  
//     res.status(200).json({
//       success: true,
//       classes,
//     });
//   };
const handler = async (req,res,props) =>{

  const {method} = req;
//   const CreatedBy = "Chetan"
//   const Id = crypto.randomBytes(8).toString("hex").slice(0, 8).toUpperCase();
//   const QuesId = `Q${Id}`;
  if(method !== "GET"){
      return res.status(400).json({success:false, message:"Only GET requests are allowed."})

  }
//   const {  Ques, Op1, Op2,Op3,Op4,Type,SubType,Ans } = req.body;

//   console.log(Ques);
//   console.log(Op1);
//   console.log(Op2);
//   console.log(Op3);
//   console.log(Op4);
//   console.log(Ans);
//   console.log(Type);
//   console.log(SubType);
//   if (!Ques || !Op1|| !Op3||!Op4||!Type||!SubType||!Ans|| !CreatedBy) {
//       return res.status(400).json({success:false, message:"Please Enter All Required Field"})
//     }

  const getQuestion = await DataBank.find();

  res.status(201).json({
      success: true,
      getQuestion,
      message: " sccessfully ",
    });

}
export default handler;
  // const createQuestion = async (req, res, next) => {

  //   const {title,desc,slug,image} = req.body
    
  //   // const user = req.user.id;
    
  //     const question = await DataBank.create({
  //       title,
  //       desc,
  //       slug,
  //       image
  //     });
    
  //     res.status(201).json({
  //       success: true,
  //       classes,
  //     });
  // };
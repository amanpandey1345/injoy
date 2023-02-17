import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import AllQ from "../components/AllQ";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [question, setQuestion] = useState("");
  const [getQ, setGetQ] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [desc, setDesc] = useState(""); 
  const [subjtype, setSubjType] = useState("");
  const [chaptype, setChaptype] = useState("");
  const [toptype, setToptype] = useState("");
  const [refs,SetRefs] = useState(false); 
  const [sub,SetSub] = useState("");
  const [top,SetTop] = useState("");
  const [chap,SetChap] = useState(""); 
  const [createdBy, SetCreatedBy] = useState("");
  
  

  
  const handleCreate = async (e) => {
    e.preventDefault();
  
    if(!subjtype || !createdBy|| !chaptype || !question || !toptype || !answer || !option4 || !option3 || !option2 || !option1){
      return toast.warn("Fill All Required felids", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(  
      "http://localhost:3000/api/databankApi/dataBank",
      {
        Ques: question,
        QuesImg: question,
        Op1: option1,
        Op2: option2,
        Op3: option3,
        Op4: option4,
        Op1Img: option1,
        Op2Img: option2,
        Op3Img: option3,
        Op4Img: option4,
        desc,
        Ans: answer,
        SubjectId: subjtype,
        ChapterId:chaptype,
        TopicId:toptype,
        CreatedBy: createdBy,

      },
      config
    );
    // console.log({ data });
    if(data.success === true){

      setAnswer("")
      setOption4("")
      setOption3("")
      setOption2("")
      setOption1("")
      setQuestion("")
      setDesc("")
      SetRefs(true)
      toast.success("Form submited successfully!! ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  useEffect(() => {
    
    axios
      .get("http://localhost:3000/api/databankApi/GetDataBank")
      .then((response) => setGetQ(response.data.getQuestion));

  }, [refs]);


  useEffect(() => {
    const hello = async()=>{

      const { data } = await axios.get(
        "http://localhost:3000/api/databankApi/GetDataBank"
      );

          setGetQ(data.getQuestion );

    }
    hello()
    handleSub()

    // console.log("hello");
  }, [])
  useEffect(() => {
    handleChap()
    setToptype("")


    // console.log(subjtype); 
  }, [subjtype])
  
  useEffect(() => {
    handleTop()
    setToptype("")
    // console.log(subjtype); 
  }, [chaptype])
  
  
  const handleSub = async()=>{
    // e.preventDefault();

    const { data } = await axios.get(
      "http://localhost:3000/api/databankApi/subject"
    );

    SetSub(data.subject );

    console.log("1");

  }
  
  const handleChap = async()=>{
    // e.preventDefault();

    const { data } = await axios.get(
      `http://localhost:3000/api/databankApi/chapter/${subjtype}`
    );

    SetChap(data.chapter );
    // console.log(chap);

  }
  const handleTop = async()=>{
    // e.preventDefault();

    const { data } = await axios.get(
      `http://localhost:3000/api/databankApi/topic/${chaptype}`
    );

    SetTop(data.topic );
    // console.log(chap);

  }

  const handleDeleteQues =async(id)=>{

        
    const { data } = await axios.delete(
        `http://localhost:3000/api/databankApi/delete/${id}`
      );

      if(data.success === true){
        SetRefs(!refs)

        toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
}
  

  

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className=" container  flex  md:justify-start  md:items-start  h-auto mt-2 flex-col space-y-4 bg-gradient-to-b from-orange-400 bg-yellow-300 to-yellow-200 ... p-4 rounded-md">
          <div className="flex flex-col w-full space-y-3 md:flex-row md:space-y-0 ">
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subjtype}
                label="Subject"
                onChange={(e) => setSubjType(e.target.value)}
                // onClick={(e) => handleSub(e)}
              >
              {!sub ? "handleSub " :
                  sub.map((math) => (
                    <MenuItem value={`${math.SubjectId}`} key={`${math.SubjectId}`}   >
                      {math.Subject}
                    </MenuItem>
                  ))}

              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chaptype}
                label="Chapter"
                
                onChange={(e) => setChaptype(e.target.value)}
              >
                {!chap ? "handleChap" :
                  chap.map((math) => (
                    <MenuItem value={`${math.ChapterId}`} key={`${math.ChapterId}`}   >
                      {math.Chapter}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Topic</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toptype}
                label="Topic"
                
                onChange={(e) => setToptype(e.target.value)}
              >
                {!top ? "handleTop" :
                  top.map((math) => (
                    <MenuItem value={`${math.TopicId}`} key={`${math.TopicId}`}   >
                      {math.Topic}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <TextField

            id="Question"
            label="Enter Question Here"
            fullWidth
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="flex flex-col items-center w-full p-2 rounded-md bg b md:flex-row ">
            <TextField
              id="options"
              label="Option1"
              name="option1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <TextField
              id="options"
              label="Option2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            <TextField
              id="options"
              label="Option3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
            <TextField
              id="options"
              label="Option4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)} 
            />
            <FormControl className="w-full md:w-48" >
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={answer}
                label="Answer"
                onChange={(e) => setAnswer(e.target.value)}
                // onClick={(e) => handleSub(e)}
              >

                    <MenuItem value={"Op1"}   >
                     Option1
                    </MenuItem>
                    <MenuItem value={"Op2"}   >
                     Option2
                    </MenuItem>
                    <MenuItem value={"Op3"}   >
                     Option3
                    </MenuItem>
                    <MenuItem value={"Op4"}   >
                     Option4
                    </MenuItem>


              </Select>
            </FormControl>
          </div>
          <TextField

            id="Description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
                    <FormControl className="w-[30%]">
            <InputLabel id="demo-simple-select-label">Created By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createdBy}
              label="Created By"
              onChange={(e) => SetCreatedBy(e.target.value)}
              // onClick={(e) => handleSub(e)}
            >
              <MenuItem value={"Chetan"}>Chetan</MenuItem>
              <MenuItem value={"Aman"}>Aman</MenuItem>
              <MenuItem value={"Vikash"}>Vikash</MenuItem>
              <MenuItem value={"Rabbit"}>Rabbit</MenuItem>
            </Select>
          </FormControl>

          <Button
            className="bg-green-600 hover:bg-yellow-600"
            variant="contained"
            type="submit"

            onClick={(e) => handleCreate(e)} 
          >
            Submit
          </Button>

          <div className="flex flex-col p-2 bg-yellow-200 rounded-md">
            <div className="flex flex-col m-2 md:flex-row ">
              <h1 className="mr-5">Ques :- </h1>
              <p className="p-1 ">{question}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">A-&gt;</h1>
              <p>{option1}</p>
            </div>
            <div className="flex m-2 ">
              <h1 className="mr-5">B-&gt; </h1>
              <p>{option2}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">C-&gt;</h1>
              <p>{option3}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">D-&gt; </h1>
              <p>{option4}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">Ans-&gt; </h1>
              <p>{answer}</p>
            </div>
          </div>
        </div>
        <AllQ data={getQ} func={handleDeleteQues} />
      </div>
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from 'axios';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const topic = () => {

    const [sub,SetSub] = useState("");
    const [posttop,SetPosttop] = useState("");
    const [chap,SetChap] = useState(""); 
    const [subjtype, setSubjType] = useState("");
    const [chaptype, setChaptype] = useState("");
    const [getQ, setGetQ] = useState([]);
    const [refs,SetRefs] = useState(false); 
    const [createdBy, SetCreatedBy] = useState("");

    useEffect(() => {
    
        axios
          .get("http://localhost:3000/api/databankApi/topic")
          .then((response) => setGetQ(response.data.topic));
    
      }, [refs]);
    useEffect(() => {
        handleSub()
    }, [])
    useEffect(() => {
        handleChap()
    }, [subjtype])
    

    const handleChap = async()=>{
        // e.preventDefault();
    
        const { data } = await axios.get(
          `http://localhost:3000/api/databankApi/chapter/${subjtype}`
        );
    
        SetChap(data.chapter );
        // console.log(chap);
    
      }
      const handleSub = async()=>{
        // e.preventDefault();
    
        const { data } = await axios.get(
          "http://localhost:3000/api/databankApi/subject"
        );
    
        SetSub(data.subject );
        
        // console.log(sub);
    
      }
      const handleCreatetop= async(e)=>{
        e.preventDefault();
        if(!chaptype || !subjtype || !posttop || !createdBy){
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
            "http://localhost:3000/api/databankApi/topic/postTopic",
            {
              SubjectId: subjtype,
              ChapterId:chaptype,
              Topic:posttop,
              CreatedBy: createdBy,
            },
            config 
          );

          if(data.success === true){
            SetPosttop("")
            SetRefs(!refs)


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

    }
    const handleDeletetop =async(id)=>{

        
        const { data } = await axios.delete(
            `http://localhost:3000/api/databankApi/topic/delete/${id}`
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
            
          </div>

          <TextField
            id="Topic"
            label="Enter Topic Name"
            fullWidth

            value={posttop}
            onChange={(e) => SetPosttop(e.target.value)}
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
          
        </div>
        <Button
            className="bg-green-600 hover:bg-yellow-600"
            variant="contained"
            type="submit"

            onClick={(e) => handleCreatetop(e)} 
          >
            Submit
          </Button>
          {getQ ? getQ.slice(0).reverse().map((el, index) => (
          <div className="flex flex-col w-[90%] p-2 mt-4 bg-yellow-200 rounded-md " key={index}>
            <div  className='flex justify-between'>
            <h1>{el.Topic}</h1> 

            <Button
            className="bg-red-600 hover:bg-yellow-600 "
            variant="contained"
            type="submit"
            
            onClick={(e) => handleDeletetop(el.TopicId)} 
            >
            Delete
          </Button>
              </div>
          <div className="flex justify-between m-2">
            <h4 className="mr-5">Created By -&gt; {el.CreatedBy} </h4>
            <h6 className="mr-5"> {moment(el.createdAt).fromNow()} </h6> 

          </div>

        </div>
        )):<h1>Loading.....</h1>}
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
  )
}

export default topic
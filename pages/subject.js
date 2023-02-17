import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const subject = () => {
  const [postsubj, setPostsubj] = useState("");
  const [getQ, setGetQ] = useState([]);
  const [refs, SetRefs] = useState(false);
  const [createdBy, SetCreatedBy] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/databankApi/subject")
      .then((response) => setGetQ(response.data.subject));
  }, [refs]);

  const handleCreatesub = async (e) => {
    e.preventDefault();
    if (!postsubj || !createdBy) {
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
      "http://localhost:3000/api/databankApi/subject/postSubject",
      {
        Subject: postsubj,
        CreatedBy: createdBy,
      },
      config
    );
    // console.log({ data });
    if (data.success === true) {
      setPostsubj("");
      SetRefs(!refs);

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
    console.log(postsubj);
  };


  const handleDeletesub =async(id)=>{

        
    const { data } = await axios.delete(
        `http://localhost:3000/api/databankApi/subject/delete/${id}`
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
          <TextField
            id="Subject"
            label="Enter Subject Name"
            fullWidth
            value={postsubj}
            onChange={(e) => setPostsubj(e.target.value)}
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
          onClick={(e) => handleCreatesub(e)}
        >
          Submit
        </Button>
        {getQ ? getQ.slice(0).reverse().map((el, index) => (
          <div className="flex flex-col w-[90%] p-2 mt-4 bg-yellow-200 rounded-md " key={index}>
            <div className="flex justify-between">
            <h1>{el.Subject}</h1>
            <Button
            className="bg-red-600 hover:bg-yellow-600 "
            variant="contained"
            type="submit"
            
            onClick={(e) => handleDeletesub(el.SubjectId)} 
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
  );
};

export default subject;

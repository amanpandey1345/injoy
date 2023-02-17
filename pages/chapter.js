import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const chapter = () => {
  const [subjtype, setSubjType] = useState("");
  const [sub, SetSub] = useState("");
  const [postchap, SetPostchap] = useState("");
  const [createdBy, SetCreatedBy] = useState("");
  const [getQ, setGetQ] = useState([]);
  const [refs, SetRefs] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/databankApi/chapter")
      .then((response) => setGetQ(response.data.chapter));
  }, [refs]);

  useEffect(() => {
    handleSub();
  }, []);

  const handleSub = async () => {
    // e.preventDefault();

    const { data } = await axios.get(
      "http://localhost:3000/api/databankApi/subject"
    );

    SetSub(data.subject);

    // console.log(sub);
  };

  const handleCreatechap = async (e) => {
    e.preventDefault();
    if (!postchap || !subjtype|| !createdBy) {
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
      "http://localhost:3000/api/databankApi/chapter/postChapter",
      {
        SubjectId: subjtype,
        Chapter: postchap,
        CreatedBy: createdBy,
      },
      config
    );

    if (data.success === true) {
      SetPostchap("");
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
  };
  const handleDeletechap = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/databankApi/chapter/delete/${id}`
    );

    if (data.success === true) {
      SetRefs(!refs);

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
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className=" container  flex  md:justify-start  md:items-start  h-auto mt-2 flex-col space-y-4 bg-gradient-to-b from-orange-400 bg-yellow-300 to-yellow-200 ... p-4 rounded-md">
          <div className="flex flex-col w-full space-y-3 md:flex-row md:space-y-0 ">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subjtype}
                label="Subject"
                onChange={(e) => setSubjType(e.target.value)}
                // onClick={(e) => handleSub(e)}
              >
                {!sub
                  ? "handleSub "
                  : sub.map((math) => (
                      <MenuItem
                        value={`${math.SubjectId}`}
                        key={`${math.SubjectId}`}
                      >
                        {math.Subject}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            id="Question"
            label="Enter Chapter Name"
            fullWidth
            value={postchap}
            onChange={(e) => SetPostchap(e.target.value)}
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
          onClick={(e) => handleCreatechap(e)}
        >
          Submit
        </Button>
        {getQ ? (
          getQ
            .slice(0)
            .reverse()
            .map((el, index) => (
              <div
                className="flex flex-col w-[90%] p-2 mt-4 bg-yellow-200 rounded-md "
                key={index}
              >
                <div className="flex justify-between">
                  <h1>{el.Chapter}</h1>
                  <Button
                    className="bg-red-600 hover:bg-yellow-600 "
                    variant="contained"
                    type="submit"
                    onClick={(e) => handleDeletechap(el.ChapterId)}
                  >
                    Delete
                  </Button>
                </div>
                <div className="flex justify-between m-2">
                  <h4 className="mr-5">Created By -&gt; {el.CreatedBy} </h4>
                  <h6 className="mr-5"> {moment(el.createdAt).fromNow()} </h6>
                </div>
              </div>
            ))
        ) : (
          <h1>Loading.....</h1>
        )}
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

export default chapter;

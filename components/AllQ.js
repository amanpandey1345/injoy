import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Button } from "@mui/material";

const AllQ = ({ data,func }) => {
  // const [getQ, setGetQ] = useState();
  const [getOp1, setGetOp1] = useState("");
  const [getOp2, setGetOp2] = useState("");
  const [getOp3, setGetOp3] = useState("");
  const [getOp4, setGetOp4] = useState("");
  const [getAns4, setGetAns4] = useState("");


  if (!data) {
    return <h1>sorry</h1>;
  }

  return (
    <div className=" container  flex  md:justify-start  md:items-start  h-screen overflow-y-scroll mt-2 flex-col space-y-4 bg-gradient-to-b from-orange-400 bg-yellow-300 to-yellow-200 ... p-4 rounded-md scroll-smooth">
      <h1> All Question</h1>

      <div className="flex flex-col w-full p-2 rounded-md ">
        {/* {console.log({ data })} */}

        {data ? data.slice(0).reverse().map((el, index) => (
          <div className="flex flex-col w-full p-2 mt-4 bg-yellow-200 rounded-md " key={index}>
          <div className="flex justify-between">
            <div className="flex flex-col m-2 md:flex-row">
            <h1 className="mr-5">Ques :- </h1>
            <p className="p-1 ">{el.Ques}</p> 
            </div>
            <Button
            className="bg-red-600 hover:bg-yellow-600 "
            variant="contained"
            type="submit"
            
            onClick={(e) => func(el.QuesId)} 
            >
            Delete
          </Button>
          </div>
          <div className="flex m-2">
            <h1 className="mr-5">A-&gt;</h1> 
            <p>{el.Op1}</p>
          </div>
          <div className="flex m-2 ">
            <h1 className="mr-5">B-&gt; </h1>
            <p>{el.Op2}</p>
          </div>
          <div className="flex m-2">
            <h1 className="mr-5">C-&gt;</h1>
            <p>{el.Op3}</p>
          </div>
          <div className="flex m-2">
            <h1 className="mr-5">D-&gt; </h1>
            <p>{el.Op4}</p>
          </div>
          <div className="flex m-2">
            <h1 className="mr-5">Ans-&gt; </h1>
            <p>{el.Ans}</p>
          </div>
          <div className="flex justify-between m-2">
            <h4 className="mr-5">Created By -&gt; {el.CreatedBy} </h4>
            <h6 className="mr-5"> {moment(el.createdAt).fromNow()} </h6> 

          </div>

        </div>
        )):<h1>Loading.....</h1>}

        {/* {data.map((ev) => {
          <div className="flex flex-col p-2 bg-yellow-200 rounded-md" key={ev.QuesId}>
            <div className="flex flex-col m-2 md:flex-row">
              <h1 className="mr-5">Ques :- </h1>
              <p className="p-1 ">{getOp1}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">A-&gt;</h1>
              <p>{getOp1}</p>
            </div>
            <div className="flex m-2 ">
              <h1 className="mr-5">B-&gt; </h1>
              <p>{getOp2}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">C-&gt;</h1>
              <p>{getOp3}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">D-&gt; </h1>
              <p>{getOp4}</p>
            </div>
            <div className="flex m-2">
              <h1 className="mr-5">Ans-&gt; </h1>
              <p>{getAns4}</p>
            </div>
          </div>
      })} */}
      </div>
    </div>
  );
};

export default AllQ;

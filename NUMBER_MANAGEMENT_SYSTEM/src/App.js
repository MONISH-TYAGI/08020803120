import logo from './logo.svg';
import './App.css';
import React, { useState  } from "react";
function App() {
const [urltext,seturl]=useState("");
const [result,setresult]=useState([]);
const [check,setcheck]=useState(false);
  const handleSubmit = () => {
    const urlArr = urltext.split(',').filter((obj) => obj.trim());
    console.log(urlArr.length);
    const promises = urlArr.map((url) => 
    fetch(url)
    
    );
    Promise.all(promises)
      .then((res) => {
        return Promise.all
        (res.map((r)=>{
          try{
            if(r.type=="cors"){
              console.log("response",r)
           let obj=r.json()
           
           return obj;
            }else
            {
              console.log("error");
              return JSON.parse("invalid url:invalid");
            }
          }catch(err){
            console.log("error");
            // return JSON.parse("invalid url");
          }
        }))
          
      }
      )
      .then((data) => {
        setresult(data);
        setcheck(true);
      }
      );

    
 
  };


  return (
    <div className="App w-full h-screen  flex  justify-center">
      <div class="bg-blue-200   h-1/2 w-1/2 mt-10 ">
       <div class="flex justify-center ">  <span class=" font-bold text-3xl">NUMBER_MANAGEMENT_SYSTEM</span></div>
        <div>
          <div class="flex justify-center text-2xl mt-1" >
        <h2 >Enter all URL separated with comma in between</h2>
        </div  >
        <div class="flex justify-center  ">
        <textarea onChange={(e)=>seturl(e.target.value)}  class="w-3/4 mt-2 h-20 border border-black "></textarea>
        </div>
        <div  class="flex justify-center">
        <button class="border border-black p-1 bg-green-200 mt-2 " onClick={handleSubmit}>Submit</button>
       </div>
        </div>
        <div>
          <div class="flex justify-center mt-2 ">          
            
            <h2 class="font-bold text-xl">Result of All Fetched API </h2>
          </div>

          <ol>
            {result.map((obj)=>{
              return <li class="ml-2 border border-red p-2 border-black ">{JSON.stringify(obj)}</li>
            })}
          </ol>
         

        </div>
      </div>
    </div>
  );
}

export default App;

//http://20.244.56.144/numbers/odd,http://20.244.56.144/numbers/fibo,http://20.244.56.144/numbers/primes
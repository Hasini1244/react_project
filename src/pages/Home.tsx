import { useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Home(){



const [count, setCount] = useState(0)
//react hooks-useStatehooks
  const [username, setUsername] = useState<string>("");
const{logout}=useAuth()
  function handleInputChange(event:any){
    setUsername(event.target.value);

  }
  
 
  return (
    
      <div>
       
         
         <Link to="/profile" className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg bg-cyan-500  ">Profile &#128512;</Link>
       <Link to="/items" className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg bg-cyan-500">Items &#127873;</Link>
       <Link to="/categories" className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg bg-cyan-500">Item Categories &#128092;</Link>
       <Link to="/orders" className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg bg-cyan-500">Stocks &#127976;</Link>
<button className="py-3 px-10 rounded-lg bg-teal-300 text-sm text-white hover:bg-slate-950" onClick={logout}>Logout &#9194;</button>


       <h1>
       
       
       

        </h1>
        <center >
        <b className="font-family:Avenir  fontWeight: '500'  font-size: px text-2xl  max-width: 100px;" >WELCOME........</b>
        <p className="italic hover:not-italic font-size:300px">Best and cheapest point of sale system </p>
        <p>&#128512; &#128512; &#128512;</p>
        <p className="  color: brown; ">Welcome to our points of sale paradise </p><p>
          &#128512; &#128525; &#128151;</p>
          <p>
          Make your day special with our greatest offers. </p>
          <p> &#129395; &#129395;  &#129395;</p>
          </center>
          
          

       
        
        </div>



      
  )

}
export default Home
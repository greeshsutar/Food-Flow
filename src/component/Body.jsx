
import { useState } from "react";

import RestraurentCard from "./RestraurentCard";
import UseApi from "./UseApi";
import Clock from "./Clock";




export default function Body(){
    
        let swiggydata = UseApi();
        const[datafilter,setdatafilter]=useState([]);
        const[inputdata,setinputdata]=useState("");
 // 4.5 rating button
function handleclick(){
    if (!swiggydata?.length) return;
   let filterdata= swiggydata.filter(item=>
    item.info.avgRating >= 4.5
      
    
    )
         setdatafilter(filterdata);

}
//reset buttton
function handlereset(){
    setdatafilter([]);
}

//search
function handleinput(searchText){
 setinputdata(searchText);
 let searchdata= swiggydata.filter((item)=>{
   return  item.info.name.toLowerCase().includes(searchText.toLowerCase())
     
 })
setdatafilter(searchdata);
}
  console.log(swiggydata);
    return(
        <>
        <div className=" ml-20  flex justify-start">
         <div className="  w-11/12" >
            <h2 className=" mt-4  ml-2 font-bold text-xl ">Restaurants with online food delivery in Belgaum</h2>
         <div className=" flex " > <button className=" mt-4 ml-2 rounded-xl p-2 bg-red-500 text-amber-50 cursor-pointer" onClick={handleclick}>
                Rating 4.5+</button>
                <button className= "bg-red-500  mt-4 ml-4 p-2 rounded-xl text-amber-50 w-20 cursor-pointer " onClick={handlereset}>Reset</button>
           <input value={inputdata} type="search" placeholder="Search here " className="border-2  mt-4 ml-15  w-2/5 h-11 rounded-xl p-4 " onChange={(e)=>handleinput(e.target.value)}></input> 
              <div className=" ml-9 flex justify-center items-center mt-4 w-20 border-2 rounded-xl bg-red-500 text-amber-50  border-gray-300"> <Clock/></div> </div>
           
            
          

      </div>
       </div>
        <div className=" flex  flex-wrap  justify-center ">
        <RestraurentCard  swiggydata={swiggydata} datafilter={datafilter} />
  

        
        </div>
      
       
       </>
       
    )
}
import { useEffect, useState } from "react"



export default function Clock(){
const[clock,setclock]=useState(new Date().toLocaleTimeString());
useEffect(()=>{
let newclock = setTimeout(()=>{
setclock(new Date().toLocaleTimeString());
},1000);

return function(){
 clearTimeout(newclock);
}


},[clock])

    
    return(
        <div>
      
            <span> {clock}</span>
               
          
      
        </div>
    )
}
import { useRouteError } from "react-router-dom"

export default function Error(){
   



    const errors =useRouteError();
    console.log(errors);
    console.log(errors.status);

    return(
   <div className=" h-screen bg-[url('https://nextstep.tcsapps.com/error/images/animationBoat.gif')] bg-cover bg-center">  
   <div className="flex justify-center items-center ">
             <div className=" flex flex-col  border-2 w-64 rounded-l-xl  text-center ">
       <h1>{errors.data}</h1>
       <h1>{errors.status}</h1>
       <h1>{errors.statusText}</h1>
    <div className=""><img src="https://nextstep.tcsapps.com/error/images/animationBoat.gif" alt="" />
        </div></div></div> 
        </div> 
     
    )
}
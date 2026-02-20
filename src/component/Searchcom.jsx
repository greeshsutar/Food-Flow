export default function Searchcom(swiggydata,setinputdata){
 function handleinput(searchText){
 let newfilter=  swiggydata.filter(item=>
   item.info.name.includes(searchText)

   )
   setinputdata(newfilter);
 }

return(
    <div>
     <input  type="search" placeholder="Search here " className="border-2  mt-4 ml-15  w-2/5 h-11 rounded-xl p-4 " onChange={(e)=>handleinput(e.target.value)}></input>
    </div>
)
}
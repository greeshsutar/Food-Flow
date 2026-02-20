import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { LuHandHelping } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";


export default function Header() {

  return (
    <div >
        <nav className=" flex p-2 justify-between items-center bg-gray-900 text-amber-50">
  <img className="logo ml-5 size-15  rounded-xl" src="https://cdn.brandfetch.io/ideeTxiKQK/w/480/h/480/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1764508876740"  /> 
 

        <ol className="Orderlist  flex  m-2  " >
          
  
        <div className="m-2 "><li className=" m-2.5 p-1"><Link to="/Other">Other</Link></li></div>    
          <div className="flex m-2  items-center" >  <span><IoSearchSharp/></span>
          <li className=" m-2.5 p-1" ><Link to="/Search">Search</Link></li></div>
        
       <div className="flex m-2  items-center"> <span><BiSolidOffer/></span> <li className=" m-2.5"><Link to="/Offers">Offer</Link></li></div>  

       <div className="flex  m-2  items-center"><span><IoPersonOutline/></span><li className="  m-2.5"><Link to="/SignUp">SignUp</Link></li></div>   
        <div className="flex m-2  items-center"> <span><MdOutlineShoppingCart/></span><li className=" m-2.5"><Link to="/Cart">Cart</Link></li></div>  
      <div className="flex m-2   items-center"> <span><MdOutlineLogin/></span><li className=" m-2.5"><Link to="/Login">Login</Link></li></div>    
      
        </ol> 
      </nav>
  
    </div>
  );
}

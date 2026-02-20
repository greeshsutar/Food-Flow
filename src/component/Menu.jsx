import { useEffect } from "react";
import axios from "axios"
export default function Menu(){
    useEffect(()=>{
        async function menudata() {
            try{
             let data = "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=15.796320490637022&lng=74.47427418082952&restaurantId=445632&submitAction=ENTER";
            let response = await axios.get(data);
           console.log(response.data.data.statusMessage);

            console.log(response.data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[3].card.card.itemCards);
            
            }
            catch(error){
                console.log(error);
            }
 
        }
        menudata();
      


    },[])
  
    return(
        <div>
       
        </div>
    )
}
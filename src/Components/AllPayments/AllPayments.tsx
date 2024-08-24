import { useEffect } from "react"
import { getImageURL } from "../Firebase/FirebaseMethod"

export default function AllPayments() {
    useEffect(()=>{
        getImageURL('users/').then((val)=>{
            console.log(val);
            
        })
    },[])
  return (
    <div></div>
  )
}

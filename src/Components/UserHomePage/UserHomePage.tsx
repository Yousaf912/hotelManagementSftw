import { useEffect, useState } from "react";
import Background from "./Background/Background";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StoreTwo } from "../ContexStore/Store";
import { getData } from "../Firebase/FirebaseMethod";
import AvailabelRoom from "./AvaliableRoom/AvailabelRoom";

export default function UserHomePage() {
    const [allRooms, setAllRooms] = useState<any>([]);
    const [statusChanged,setStc]=useState(false)
    

    
    useEffect(() => {
        getData('rooms').then((val: any) => {
            if (val) {
                const fnal = Object.values(val)
                setAllRooms(fnal)
            
                
            }
        }).catch((er) => {
            console.log(er);
        })
    }, [])


    
    

    

    const obj = {allRooms,statusChanged,setStc}

    return (
        <StoreTwo.Provider value={obj}>
            <div style={{ backgroundBlendMode: 'color', backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '100vh' }}>
                <Background />
                <Header />
                <Hero />
            </div>
            
            <AvailabelRoom/>
        </StoreTwo.Provider>
    );
}


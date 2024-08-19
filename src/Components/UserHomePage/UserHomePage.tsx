import { useEffect, useState } from "react";
import Background from "./Background/Background";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StoreTwo } from "../ContexStore/Store";
import { getData } from "../Firebase/FirebaseMethod";
import AvailabelRoom from "./AvaliableRoom/AvailabelRoom";

export default function UserHomePage() {
    const [userInfo,setUserInfo]=useState<any>({});
    const [isLogin,setIsLogin]=useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
               
               getData('userdata',user.uid).then((data)=>{
                setUserInfo(data)
                setIsLogin(true)
               }).catch((er)=>{
                console.log(er);
               })
            } else {
                console.log('No user is logged in');
            }
        });

    }, []);

    

    const obj = {isLogin,setIsLogin,userInfo}

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


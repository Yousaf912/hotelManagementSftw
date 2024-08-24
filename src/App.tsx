import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getData } from "./Components/Firebase/FirebaseMethod";
import UserHomePage from "./Components/UserHomePage/UserHomePage";
import Admin from "./Admin";
import { useEffect, useState } from "react";
import { ComonStore } from "./Components/ContexStore/Store";
import { useLocation } from "react-router-dom";

export default function App() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userUid,setUserUid]=useState<any>();
    const[ruf,setRuf]=useState(false);
  

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserUid(user.uid)
                     getData('userdata', user.uid).then((res)=>{
                        setUserInfo(res);
                        setIsLogin(true);
                    })
                    if (user.email === 'admin@gmail.com') {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
            } else {
                setIsLogin(false);
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const obj ={userInfo,isLogin,userUid,ruf,setRuf}

    return (
        <ComonStore.Provider value={obj}>
        <div>
            {isLogin ? (isAdmin ? <Admin /> : <UserHomePage />) : <UserHomePage />}
        </div>
        </ComonStore.Provider>
    );
}


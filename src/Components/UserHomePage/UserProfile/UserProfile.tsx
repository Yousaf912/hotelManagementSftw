import React, { useEffect, useState } from 'react'
import HeaderTwo from './Header/HeaderTwo'
import SideBar from './SidebarTwo/SideBar'
import { remove } from 'firebase/database'
import { useLocation } from 'react-router-dom';
import CenterElement from '../../centerdata/CenterElement';
import CenterDataTwo from './CenterData/CenterDataTwo';
import { ProfileStore } from '../../ContexStore/Store';
import { getData } from '../../Firebase/FirebaseMethod';


export default function UserProfile() {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const name = location.pathname.split('/')[3];
    const name2 = location.pathname.split('/')[4];
    const [data,setData]=useState<any>({})
    

    const [showSideBar,setShowSideBar]=useState(window.innerWidth > 768)
    const handleResize =()=>{
        setShowSideBar(window.innerWidth>768)
    }
    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        return ()=>window.removeEventListener('resize',handleResize)
    },[])

    useEffect(()=>{
        getData('userdata',id).then((res)=>{
            setData(res)
            
        })
    },[])



const obj ={id,name,data,name2}

    return (
        <ProfileStore.Provider value={obj}>
        <div className="col-12">
            <HeaderTwo />
            <div className='d-md-flex mt-5 justify-content-between'>
                {showSideBar &&
                <div className="col-lg-2 col-md-3 border">
                    <SideBar  />
                </div>}
                <div className="col-12 col-md-9 col-lg-9">
                    <CenterDataTwo/>
                </div>
            </div>
        </div>
        </ProfileStore.Provider>
    )
}

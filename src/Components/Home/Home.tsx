import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../Firebase/firebaseConfig';
import { getData } from '../Firebase/FirebaseMethod';
import { FaHouseCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { BsHouseGearFill } from "react-icons/bs";
import { BsFillHouseLockFill } from "react-icons/bs";
import { Store } from '../ContexStore/Store';
import Loader from '../../Loader';




export default function Home() {
    const contx =useContext(Store);
    const [available,setAvailable]=useState<any>([]);
    const [booked,setBoked]=useState<any>([]);
    const [cleaning,setcleaning]=useState<any>([]);

    useEffect(() => {
        const availableRooms: any[] = [];
        const bookedRooms: any[] = [];
        const cleaningRooms: any[] = [];

        contx.dat.forEach((val: any) => {
            switch (val.roomstatus) {
                case 'Available':
                    availableRooms.push(val);
                    break;
                case 'booked':
                    bookedRooms.push(val);
                    break;
                case 'Cleaning':
                    cleaningRooms.push(val);
                    break;
                default:
                    break;
            }
        });
        setAvailable(availableRooms);
        setBoked(bookedRooms);
        setcleaning(cleaningRooms);
    }, [contx.dat]); 
 

    const go = (link:any) => {
        navigate(link)
    }
    const data = [
        {
            name: 'Available Rooms',
            icon: <FaHouseCircleCheck className='fs-1' />,
            class: ' p-2 rounded-circle text-white bg-success',
            link: '/home/booking',
            nm:available
        },
        {
            name: 'Under Clean Rooms',
            icon: <BsHouseGearFill className='fs-1' />,
            class: ' p-2 rounded-circle text-white bg-warning ',
            link: '/home/underCleanRooms',
            nm:cleaning
        },
        {
            name: 'Booked Rooms',
            icon: <BsFillHouseLockFill className='fs-1' />,
            class: ' p-2 rounded-circle text-white bg-danger',
            link: '/home/booking/allBookings',
            nm:booked

        },
    ]
    const navigate = useNavigate();
    getData('123').then((dta) => {
    }).catch((er) => {
        console.log(er);
    })
    const crntuser = () => {
        onAuthStateChanged(auth, (user: any) => {

        })
    }
    useEffect((
        crntuser
    ), [])
    
console.log(available.length);


    return (
        <>
            <div>
                <h1 className='text-primary mt-3'>DashBoard</h1>
            </div>
            <div className='d-md-flex flex-wrap justify-content-between mt-5' >
                {data.map((val:any,i:any)=>{
                    return(
                <div style={{cursor:'pointer'}} key={i} onClick={() => go(val.link)} className='mt-2 mt-lg-0 col-md-5 col-lg-3 p-3 rounded-2 border border-2 d-flex align-items-center justify-content-between'>
                    <div className={val.class} >
                        {val.icon}
                    </div>
                    <div className='text-center'>
                        <h5>{val.name}</h5>
                        <h2>{val.nm.length}</h2>
                    </div>
                </div>
                    )
                })}
            </div>
        </>
    )
}

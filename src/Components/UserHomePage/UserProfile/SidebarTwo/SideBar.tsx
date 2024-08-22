import style from './SideBar.module.css'
import { IoIosPerson } from "react-icons/io";
import { RiServiceLine } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { TbUserQuestion } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProfileStore } from '../../../ContexStore/Store';





export default function SideBar() {
    const contx = useContext(ProfileStore);
    const id = contx.id
    const location = useLocation();
    const name = contx.name
    
    
    const navigate =useNavigate()

    const data = [
        {
            name: 'Profile',
            icon: <IoIosPerson className='fs-2 me-4' />,
            link: `/profile/${id}/profile`
        },
        {
            name: 'Services',
            icon: <RiServiceLine className='fs-3 me-4' />,
            link: `/profile/${id}/services`
        },
        {
            name: 'Bookings',
            icon: <FaListCheck className='fs-3 me-4' />,
            link: `/profile/${id}/bookings`
        },
        {
            name: 'Complians',
            icon: <TbUserQuestion className='fs-3 me-4' />,
            link: `/profile/${id}/complains`
        },
        {
            name: 'OrderFood',
            icon: <IoFastFoodOutline className='fs-3 me-4' />,
            link: `/profile/${id}/orderfood`
        },

    ]

    const go =(link:any)=>{
        navigate(link)
    }
    return (
        <div className={`${style.main} pe-lg-4 pt-4 p-md-3`}>
            <div>
                {data.map((val: any, i: any) => {
                    return (
                        <li key={i} onClick={()=>go(val.link)} className={`${val.name.toLowerCase() == name?style.active: style.li} d-flex ms-1 border mt-3 px-3 py-1 rounded-5 `} >
                            <div className='d-flex justify-content-around ' style={{width:'100%'}}>
                                {val.icon}
                                {val.name}
                            </div>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

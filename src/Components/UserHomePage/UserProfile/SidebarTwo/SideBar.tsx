import style from './SideBar.module.css'
import { IoIosPerson } from "react-icons/io";
import { RiServiceLine } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";




export default function SideBar() {
    const data = [
        {
            name: 'Profile',
            icon: <IoIosPerson className='fs-2'/>,
            link: ''
        },
        {
            name: 'Services',
            icon: <RiServiceLine  className='fs-2'/>,
            link: ''
        },
        {
            name: 'Booking',
            icon: <FaListCheck className='fs-2 ' />,
            link: ''
        },

    ]
    return (
        <div className={`${style.main}`}>
            {data.map((val:any,i:any)=>{
                return(
                    <div className='d-flex align-items-center justify-content-evenly '>
                        {val.icon}
                        <h5>{val.name}</h5>
                    </div>
                )
            })}
        </div>
    )
}

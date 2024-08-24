import  { useContext} from 'react'
import logo from '../../assets/images-removebg-preview.png';
import style from './sidebar.module.css';
import { GiGreenhouse } from "react-icons/gi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";
import { RiCustomerServiceFill } from "react-icons/ri";



import { CiBookmarkPlus } from "react-icons/ci";

import { Store } from '../ContexStore/Store';

export default function Sidebar() {
  const storObj = useContext(Store);
 

    const data = [

        {
            name: 'Rooms',
            nested: {
                add: 'Add Room',
                list: 'ROom List',
                link1: '/home/addRoom',
                link2: '/home/roomlist',
            },
            icon: < GiGreenhouse />,
            arow: <IoIosArrowForward />,
            arow2: <IoIosArrowDown />,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name: 'Booking',
            nested: {
                add: 'Avaliable Rooms',
                list: 'All Bookings',
                link1: '/home/booking',
                link2: '/home/booking/allBookings',
            },
            icon: < CiBookmarkPlus />,
            arow: <IoIosArrowForward />,
            arow2: <IoIosArrowDown />,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'Staff',
            nested:{
                add:'Add Staff',
                list:'List of Staff',
                link1:'/home/addstaff',
                link2:'/home/stafflist'
            },
            icon:<MdGroups />,
            arow: <IoIosArrowForward />,
            arow2: <IoIosArrowDown />,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'Food',
            nested:{
                add:'Add Food',
                list:'List Food',
                link1:'/home/addfood',
                link2:'/home/foodlist'
            },
            icon:<IoFastFoodOutline />,
            arow: <IoIosArrowForward />,
            arow2: <IoIosArrowDown />,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'All Users',
            link:'/home/allusers',
            icon:<FaUsers/>,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'All food Orders',
            link:'/home/allorders',
            icon:<IoFastFoodOutline />,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'All Services Request',
            link:'/home/allservicesrequests',
            icon:<MdOutlineCleaningServices/>,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
        {
            name:'All Complains',
            link:'/home/allcomplains',
            icon:<RiCustomerServiceFill/>,
            action: storObj.starow,
            action2:storObj.nstdli,
        },
    
       

    ]
    return (
        <>
            <div className={`${style.min} container border-0 rounded-4 p-2 `}>
                
                <div className="row">
                    <div className="text-center mb-3 mt-2" >
                        <img src={logo} width={100} />
                    </div>
                    <ul className={`col-12 ${style.ulstyl}`}>
                        {data.map((val: any, i: any) => {
                            return (
                                <div key={i}>
                                    <div className={` ${storObj.arrow == val.name ? style.activ : style.hov} d-flex align-items-center justify-content-around  border-2 border rounded-3 mt-2`} >
                                        <div onClick={() => val.action(val.name)} className={` ${style.namdiv}  d-flex  align-items-center mt-1`}>
                                            <div className={`${storObj.arrow == val.name ? style.icn2 : style.icn}`}>
                                                {val.icon}
                                            </div>
                                            <div className={` ${style.lidv} `}>
                                                <Link to={val.link} className="text-white text-decoration-none text-black">
                                                    <li>{val.name}</li>
                                                </Link>

                                            </div>
                                        </div>
                                        <div onClick={() => val.action('')} className=" text-white  px-2">
                                            {storObj.arrow == val.name ? val.arow2 : val.arow}
                                        </div>
                                    </div>
                                    {val.nested && storObj.arrow == val.name &&
                                        <ul>
                                            <Link to={val.nested.link1} className="text-white text-decoration-none text-black">
                                                <li className={`border ps-2 rounded-5 mt-2 ${storObj.nestdli == val.nested.add && style.activ} ${style.nk}`} onClick={() => val.action2(val.nested.add)}>{val.nested.add}</li>
                                            </Link>
                                            <Link to={val.nested.link2} className=" text-white text-decoration-none text-black ">
                                                <li className={`border ps-2 rounded-5 ${storObj.nestdli == val.nested.list && style.activ} ${style.nk} mt-1`} onClick={() => val.action2(val.nested.list)}>{val.nested.list}</li>
                                            </Link>
                                            <Link to={val.nested.link3} className="text-white  text-decoration-none text-black ">
                                                <li className={` ${storObj.nestdli == val.nested.thid && style.activ} ${style.nk} mt-1`} onClick={() => val.action2(val.nested.thid)} >{val.nested.thid}</li>
                                            </Link>

                                        </ul>}
                                </div>

                            )
                        })}
                    </ul>
                </div>
            </div>
            
        </>
    )
}

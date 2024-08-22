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
    const id = contx.id;
    const name = contx.name;
    const nstdName = contx.name2
    console.log(name);


    const navigate = useNavigate()

    const data = [
        {
            name: 'Profile',
            icon: <IoIosPerson className='fs-2 me-4' />,
            link: `/profile/${id}/profile`
        },
        {
            name: 'Services',
            icon: <RiServiceLine className='fs-3 me-4' />,
            link: `/profile/${id}/services`,
            nstd: {
                name: 'Request',
                name2: 'Request Status',
                link1: `/profile/${id}/services/request`,
                active1: 'request',
                link2: `/profile/${id}/services/myRequest`,
                active2: 'myRequest'

            }
        },
        {
            name: 'Bookings',
            icon: <FaListCheck className='fs-3 me-4' />,
            link: `/profile/${id}/bookings`
        },
        {
            name: 'Complains',
            icon: <TbUserQuestion className='fs-3 me-4' />,
            link: `/profile/${id}/complains`,
            nstd: {
                name: 'Complain',
                name2: 'Complain Status',
                link1: `/profile/${id}/complains/complain`,
                active1: 'complain',
                link2: `/profile/${id}/complains/complainStatus`,
                active2: 'complainStatus'

            }
        },
        {
            name: 'OrderFood',
            icon: <IoFastFoodOutline className='fs-3 me-4' />,
            link: `/profile/${id}/orderfood`,
            nstd: {
                name: 'Order',
                name2: 'Order Status',
                link1: `/profile/${id}/orderfood/order`,
                active1: 'order',
                link2: `/profile/${id}/orderfood/orderList`,
                active2: 'orderList'

            }
        },

    ]

    const go = (link: any) => {
        navigate(link)
    }
    return (
        <div className={`${style.main} pe-lg-4 pt-4 p-md-3`}>
            <div>
                {data.map((val: any, i: any) => {
                    return (
                        <>
                            <li key={i} onClick={() => go(val.link)} className={`${val.name.toLowerCase() == name ? style.active : style.li} d-flex ms-1  mt-3 px-3 py-1 rounded-5 `} >
                                <div className='d-flex justify-content-around ' style={{ width: '100%' }}>
                                    {val.icon}
                                    {val.name}
                                </div>

                            </li>

                            {val.nstd && val.name.toLowerCase() == name &&
                                <ul>
                                    <li className={`${val.nstd.active1 == nstdName ? style.active : style.li}    mt-3 px-4 py-1 rounded-5 `} onClick={() => go(val.nstd.link1)} >{val.nstd.name}</li>
                                    <li className={`${val.nstd.active2 == nstdName ? style.active : style.li}   mt-3 px-4 py-1 rounded-5 `} onClick={() => go(val.nstd.link2)}>{val.nstd.name2}</li>
                                </ul>}
                        </>
                    )
                })}
            </div>
        </div>
    )
}

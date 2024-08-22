import style from './Slip.module.css';
import log from '../../../../../assets/rani logo.png'
import { useContext, useEffect, useState } from 'react';
import { ProfileStore } from '../../../../ContexStore/Store';
import { useLocation } from 'react-router-dom';

export default function Singleslip() {
    const contx = useContext(ProfileStore);
    const [data, setdata] = useState<any>({});
    const [totalPrice, setTotalPrice] = useState<any>();
    const location = useLocation();
    const roomNumber = location.pathname.split('/')[5];
    
  
    
    

    useEffect(() => {
        if (Object.values(contx.data).length != 0) {
            const room = Object.values(contx.data.booking);
            
            if(room){
                const b = room.filter((val:any)=>{
                    return(
                        val.roomnumber.includes(roomNumber)
                    )
                })
                const fnal:any= b[0];
                
            setdata(fnal)
            setTotalPrice(fnal.roomprice * fnal.day)
            }

        } else {
        }

    }, [contx.data])
   
    

    return (
        <>
            <div className={`${style.main} col-lg-7 col-md-12 mx-auto col-sm-10 p-1 mb-5`}>
                <div className={` border border-2 border-black`}>
                    <div className='d-flex justify-content-sm-between justify-content-lg-evenly justify-content-xl-between'>
                        <div className={`${style.slip} col-sm-3 col-4 rounded-1 p-1`}>
                            <img src={log} style={{ width: "100%" }} />
                        </div>
                        <div className='col-5 me-1 ms-2 ms-sm-0'>
                            <h6>Hani Royal Luxry Hotel</h6>
                            <p>
                                +1 (555) 123-4567
                                info@grandviewhotel.com
                                www.grandviewhotel.com
                            </p>
                        </div>
                    </div >
                    <div className=' text-center mt-2'>
                        <h6>Room Booking Fee</h6>
                    </div>
                    <div className='border-top  p-1 border-2 border-black'>
                        <h6>
                            For the credit of : Hani ROyal Luxury Hotel <br />
                            Account No : 98120106289949 <br />
                            IBAN No: PAK98120283877433
                        </h6>
                    </div>

                    <div className='mt-2  border-top border-black border-2 d-flex justify-content-between'>
                        <div className='border-end border-2 border-black justify-content-around d-flex col-6'>
                            <h6 >Date :</h6>
                            <p>{data.date}</p>
                        </div>
                        <div className='col-6 justify-content-around  d-flex'>
                            <h6 >Challan No:</h6>
                            <p>{data.bookingid}</p>
                        </div>
                    </div>
                    <div className=' p1 border-top border-black border-2'>
                        <div className='mt-2 ps-1'>
                            <span className='d-flex'>
                                <h6>Customer Name: </h6>
                                <p>{data.name}</p>
                            </span>

                            <span className='d-flex'>
                                <h6>Customer Adress: </h6>
                                <p>{data.address}</p>
                            </span>
                        </div>
                    </div>
                    <div className=' p1 border-top border-black border-2'>
                        <div className='d-flex  justify-content-around'>
                            Price Per Day :
                            <h6>{data.roomprice}</h6>
                        </div>
                        <div className='d-flex  justify-content-around'>
                            Number of days :
                            <h6>{data.day}</h6>
                        </div>
                        <div className='d-flex  justify-content-around'>
                            Total Price :
                            <h6 className='border-top border-2 border-black col-3 text-center'>Rs: {totalPrice}</h6>
                        </div>
                    </div>
                    <div className=' p1 border-top border-black border-2 pt-5 '>
                        <p className='border-top text-center col-10 mx-auto mt-5'>Bank authorized signature or stamp</p>
                    </div>
                    <div className=' p1 border-top border-black border-2 '>
                        <ul>
                            <li>
                                <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, nulla.</h6></li>
                            <li>
                                <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, nulla.</h6></li>
                        </ul>
                    </div>


                </div>
            </div>
        </>
    )
}
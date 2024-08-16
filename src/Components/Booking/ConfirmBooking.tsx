import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../ContexStore/Store'
import { getData } from '../Firebase/FirebaseMethod';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConfirmBooking() {
    const contx = useContext(Store);
    const navigate = useNavigate();
    const [dat, setData] = useState<any>({});
    const num = useLocation();
    const b = num.pathname.split('/')[4];
    
    


    useEffect(() => {
        getData(`booking/${b}`).then((val) => {
            val &&
                setData(val)
        }).catch((er) => {
            console.log(er);
        })

    }, [])

    const price =()=>{
        navigate(`/home/booking/confirmPrice/${dat.roomnumber}`)
    }



    return (
        <div>
            <div className='text-center text-white' style={{ backgroundColor: '#4790f0' }}>
                <h1>Confirm Booking</h1>
            </div>
            {dat.values === 0 ? <h6>No data found</h6> :
                <div className=' mt-5'>
                    <div className='d-flex  flex-wrap col-lg-10 mx-auto '>
                        <div className=' col-6'>
                            <h5 className=''>Booking Id: </h5>
                            <p>{dat.bookingid}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Room Id: </h5>
                            <p>{dat.roomid}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Room Type: </h5>
                            <p>{dat.roomtype}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Room Price: </h5>
                            <p>{dat.roomprice}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Room Number: </h5>
                            <p>{dat.roomnumber}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Customer name: </h5>
                            <p>{dat.number}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Adress: </h5>
                            <p>{dat.address}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Description: </h5>
                            <p>{dat.description}</p>
                        </div>


                    </div>
                    <div className='text-center mt-5'>
                        <button onClick={price} className='border-0 rounded-4 py-2 px-3 text-white' style={{ backgroundColor: "#bd9834" }}>Confirm</button>
                    </div>

                </div>
            }
        </div>
    )
}

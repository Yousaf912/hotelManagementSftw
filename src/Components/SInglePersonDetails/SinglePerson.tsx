import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getData, removeData, sendData } from '../Firebase/FirebaseMethod';
import { MdDeleteForever } from "react-icons/md";
import {  Store } from '../ContexStore/Store';
import { toast, ToastContainer } from 'react-toastify';

export default function SinglePerson() {
    const data = useContext(Store)
    const [dat, setdat] = useState<any>({})
    const location = useLocation().pathname.split('/')[3];
    const [status, setStatus] = useState<any>('');
    const navigate = useNavigate();
   

    useEffect(() => {
        getData('booking').then((val: any) => {
            const data = Object.values(val);
            let b = data.filter((dat: any) => {
                return (
                    dat.bookingid == location
                )
            })
            const fnal = b[0];

            setdat(fnal || {})

        }).catch((er) => {
            console.log(er);

        })
    }, []);


    const deleteBooking = (fnal: any, customerid: any) => {
        data.setDelt(!data.delt)
        if (status == '') {
            toast.error('Select the Status')
        } else {



            const updatedData = data.dat.map((val: any) => {
                if (val.roomnumber === fnal) {
                    return { ...val, roomstatus: 'Available' };
                }
                return val;
            });

            const obj = updatedData.filter((va: any) => {
                return va.roomnumber == fnal
            })
            const fnlObj = obj[0]
            sendData('rooms', fnlObj, fnal).then(() => {
                data.setDelt(!data.delt)

                removeData('booking', fnal).then(() => {
                    removeData('booking', fnal, customerid,'userdata').then(() => {
                        
                        toast.success(`Booking of ${dat.name} is Deleted`);
                        setTimeout(() => {
                            navigate('/home/booking/allBookings')
                        }, 3000)
                    })
                }).catch(() => {
                })
            }).catch((er) => {
                console.log(er);
            })

        }
    };


   


    return (

        <div>
            <ToastContainer />
            <div className='text-center text-white' style={{ backgroundColor: '#4790f0' }}>
                <h1>Details Of {dat.name}</h1>
            </div>
            {dat.values === 0 ? <h6>No data found</h6> :
                <div className=' mt-5'>
                    <div className='d-flex  flex-wrap col-lg-10 mx-auto '>
                        <div className=' col-6'>
                            <h5 className=''>Customer Name: </h5>
                            <p>{dat.name}</p>
                        </div>

                        <div className=' col-6'>
                            <h5 className=''>Customer Adress: </h5>
                            <p>{dat.address}</p>
                        </div>


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
                            <h5>Customer Number: </h5>
                            <p>{dat.number}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Adress: </h5>
                            <p>{dat.address}</p>
                        </div>
                        <div className=' justify-content-evenly col-6'>
                            <h5>Discription: </h5>
                            <p>{dat.customerid}</p>
                        </div>


                    </div>


                </div>
            }
            <div className='mt-3  d-flex justify-content-center align-items-center'>
                <div className=' '>
                    <h6>Select Room Status: </h6>
                    <select onChange={(e) => setStatus(e.target.value)} className='mb-1 py-1 rounded-5 px-2'>
                        <option value={''} selected>select</option>
                        <option value="Available">Available</option>
                        <option value="Cleaning">Cleaning</option>
                    </select>
                </div>
                <div className=' '>

                    <td onClick={() => deleteBooking(dat.roomnumber, dat.customerid)}><MdDeleteForever className=' mt-4 fs-1' style={{ color: 'red', cursor: 'pointer' }} /> </td>
                </div>
            </div>
        </div>
    )
}

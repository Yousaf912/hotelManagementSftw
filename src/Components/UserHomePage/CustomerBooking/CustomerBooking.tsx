import React, { useContext, useEffect, useRef, useState } from 'react'
import { ComonStore, StoreTwo } from '../../ContexStore/Store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getData, sendData } from '../../Firebase/FirebaseMethod';
import Loader from '../../../Loader';
import Heading from '../SmallComponent/Heading';
import style from './CustomerBooking.module.css'
import { toast, ToastContainer } from 'react-toastify';

export default function CustomerBooking() {
  const contx = useContext(ComonStore)
  const navigate = useNavigate()
  const name = useRef<any>('');
  const cnic = useRef<any>(0);
  const number = useRef<any>(0);
  const email = useRef<any>('');
  const days = useRef<any>(0);
  const address = useRef<any>('');
  const location = useLocation();
  const id = location.pathname.split('/')[3];
  const id2 = location.pathname.split('/')[4];
 

  
  
  

  const [room, setRoom] = useState<any>({});
  const [loader, setLoader] = useState(true);
  const [bookingId, setBookingId] = useState<any>();


  const generateRoomId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }
    setBookingId(result);
  };


  useEffect(() => {
    getData('rooms', id).then((val: any) => {
      if (val) {
        setRoom(val)
        setLoader(false)
        generateRoomId()
      } else {
        setRoom([])
      }
    })
  }, []);

  const changeStatus = () => {
    const newobj = { ...room, roomstatus: 'booked' };
    sendData('rooms', newobj, id)

  }





  const book = (url:any,type:any,dis:any) => {
  

    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth();
    const year = date.getFullYear();
    const date2 = `${day}/${month}/${year}`

    if (
      !name.current?.value ||
      !cnic.current?.value ||
      !number.current?.value ||
      !address.current?.value ||
      !room.roomnumber ||
      !room.roomprice ||
      !room.roomtype ||
      !room.roomid

    ) {
      toast.error('fill all filed required')
    } else {
      const obj = {
        bookingid: bookingId,
        roomnumber: room.roomnumber,
        roomid: room.roomid,
        roomprice: room.roomprice,
        roomtype: room.roomtype,
        name: name.current.value,
        cnic: cnic.current.value,
        number: number.current.value,
        address: address.current.value,
        day:days.current.value,
        date:date2,
        status:'unpaid',
        url,
        type,
        dis
      };


      sendData('booking', obj, obj.roomnumber).then(() => {
        sendData('userdata',obj,id2,'booking',obj.roomnumber).then(()=>{
          changeStatus()
          toast.success(`You Booked room ${obj.roomnumber}`);
          name.current.value = '';
          number.current.value = 0;
          address.current.value = '';
          cnic.current.value = 0;
          email.current.value = '';
          days.current.value = 0;
          
  
          setTimeout(() => {
  
            navigate(`/profile/${id2}/bookings/${obj.roomnumber}`);
          }, 5000);
        }).catch((er)=>{
          console.log(er);
          
        })
       
      }).catch((er) => {
        console.log(er);

      })

    }
  };



  return (
    <>
      <div className="container">
        <div className='col-12'>
        <Heading smal={'Room Booking'} />
        </div>
        <ToastContainer />
        {loader ?
          <div className='col-1 text-center mx-auto'>
            <Loader />
          </div> :

          <div className="row">

            <div className='d-md-flex justify-content-between'>
              <div className={`${style.romdetial} roomdetils col-md-5 `}>
                <div className='position-relative py-1 mb-3'>
                  <h3>Room Details</h3>
                </div>
                <img src={room.url} />
                <h1>{room.roomtype}</h1>
                <p>{room.description}</p>
                <div className='d-flex'>
                  <h6>Room Number: </h6>
                  <p className='ms-2'>{room.roomnumber}</p>
                </div>
                <div className='d-flex '>
                  <h6>Room Number: </h6>
                  <p className='ms-2' style={{ color: '#a37e4c' }}>{room.roomprice} / Day</p>
                </div>
              </div>


              <div className={`${style.romdetial} formdetials col-md-5 `}>
              <div className='position-relative py-1 mb-3'>
                <h3>Form Details</h3>
              </div>
              <div>
                <div className='d-flex flex-column'>
                  Name:
                  <input ref={name} placeholder='enter your full name' type="text" required />
                </div>
                <div className='d-flex flex-column mt-3'>
                  CNIC Number:
                  <input ref={cnic} placeholder='enter your CNIC' type="number" required />
                </div>
                <div className='d-flex flex-column mt-3'>
                  Contact Number:
                  <input ref={number} placeholder='enter your contact number' type="number" required />
                </div>
                <div className='d-flex flex-column mt-3'>
                  Email Adress:
                  <input ref={email} placeholder='enter your email adress' type="email" required />
                </div>
                <div className='d-flex justify-content-between  mt-3'>
                  <div className='d-flex flex-column '>
                    Number of days:
                    <input ref={days} placeholder='enter days' type="number" required />
                  </div>
                  <div className='d-flex flex-column'>
                    Booking ID:
                    <input type="text" value={bookingId} readOnly />
                  </div>
                </div>
                <div className='d-flex flex-column mt-3'>
                  Address:
                  <textarea ref={address} placeholder='enter your address' rows={3} required />
                </div>
                <div className=' mt-5 mx-auto text-center  mb-5'>
                  <button onClick={()=>book(room.url,room.roomtype,room.description)} className='btn text-white' style={{ backgroundColor: '#bd883e' }}>Book this Room</button>
                </div>
              </div>

            </div>


            </div>

          </div>









        }
      </div>
    </>
  )
}

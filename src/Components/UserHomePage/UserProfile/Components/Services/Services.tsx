import {  useEffect, useRef, useState } from 'react'
import style from './Services.module.css'

import { useLocation } from 'react-router-dom';
import { sendData } from '../../../../Firebase/FirebaseMethod';
import { toast, ToastContainer } from 'react-toastify';

export default function Services() {
 
  const location = useLocation();
  const customerId = location.pathname.split('/')[2];
  const [serviceid, setserviceid] = useState<any>();
  const dis = useRef<any>();
  const [service, setservice] = useState('');


  const serviceId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }
    return result;
  };

  useEffect(() => {
    const id = serviceId();
    setserviceid(id)
  }, [])

  const request = (e: any) => {
    setservice(e.target.value)
  }

  const send = () => {

    const obj = {
      customerid: customerId,
      serviceid: serviceid,
      description: dis.current.value,
      service: service,
      status: 'Submited'
    }
    if (!obj.service) {
      toast.error('Please Select service')
    } else {

      sendData('services', obj,obj.customerid,obj.serviceid).then(() => {
        sendData('userdata', obj,obj.customerid, 'services', obj.serviceid).then(() => {
          toast.success(`Request for ${obj.service} is send`);
          dis.current.value ='';
          serviceId()
        }).catch((er) => {
          toast.error('Facing eror please try again')
          console.log(er);
        })
      }).catch((er) => {
        console.log(er);
      })
    }
  }


  return (
    <div className={`${style.main} p-3 mb-5 rounded-3`}>
      <div className='bg-white p-2 '>
      <ToastContainer />
      <div className={`${style.heading} text-center  mb-5`}>
        <h1>Request for Service</h1>
      </div>
      <div className={`   d-flex flex-wrap justify-content-between align-items-center`}>

        <div className='d-flex flex-column col-lg-3'>
          <h6 > Please Select Service</h6>
          <div className={`${style.selct}`} >
            <select onChange={request}>
              <option selected disabled>Select Service</option>
              <option value="room service">Room Service</option>
              <option value="washroom cleaning">WashRoom Cleaning</option>
              <option value="laundry service">Laundry Service</option>
              <option value="spa and wellness">Spa and Wellness</option>
              <option value="childcare services">Childcare Services</option>
            </select>
          </div>
        </div>

        <div className='d-flex flex-column col-lg-3 mt-3 mt-sm-0'>
          <h6>Customer ID : </h6>
          <input type="text" value={customerId} readOnly />
        </div>
        <div className='d-flex flex-column col-lg-3 mt-3 mt-sm-0'>
          <h6>Service ID : </h6>
          <input type="text" value={serviceid} readOnly />
        </div>
        <div className='d-flex flex-column col-md-8 col-12 mt-5 mb-5'>
          <h6>Description : </h6>
          <textarea ref={dis} placeholder='Enter details about request / any note ' rows={5} />
        </div>

      </div>
      <div className='text-center'>
        <button onClick={send} className='btn text-white' style={{ backgroundColor: '#b47625' }}> Request</button>
      </div>
      </div>
    </div>
  )
}

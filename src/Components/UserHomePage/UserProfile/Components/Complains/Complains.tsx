import { useContext, useEffect, useRef, useState } from 'react'
import style from '../Services/Services.module.css'
import { ComonStore } from '../../../../ContexStore/Store'
import { useLocation } from 'react-router-dom';
import { sendData } from '../../../../Firebase/FirebaseMethod';
import { toast, ToastContainer } from 'react-toastify';

export default function Complains() {
  const contx = useContext(ComonStore);
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
      status: 'Submited'
    }
    if (!obj.description) {
      toast.error('Please enter your complain')
    } else {

      sendData('complains', obj,obj.customerid,obj.serviceid).then(() => {
        sendData('userdata', obj,obj.customerid, 'complains', obj.serviceid).then(() => {
          toast.success(`Your Complain is send`);
          dis.current.value ='';
        
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
    <div className={`${style.main} p-3 rounded-3 mb-5`}>
      <div className='bg-white p-3'>
      <ToastContainer />
      <div className={`${style.heading} text-center  mb-5`}>
        <h1>I have Complain</h1>
        <p>If you are facing any problem describe here we will resolve it as soon as possible</p>
      </div>
      <div className={`  d-flex flex-wrap justify-content-around align-items-center`}>

        

        <div className='d-flex flex-column col-lg-3 mt-3 mt-sm-0'>
          <h6>Customer ID : </h6>
          <input type="text" value={customerId} readOnly />
        </div>
        <div className='d-flex flex-column col-lg-3 mt-3 mt-sm-0'>
          <h6>Complain ID : </h6>
          <input type="text" value={serviceid} readOnly />
        </div>
        <div className='d-flex flex-column col-md-8 col-12 mt-5 mb-5'>
          <h6>Describe here : </h6>
          <textarea ref={dis} placeholder='Enter complain here ' rows={5} />
        </div>

      </div>
      <div className='text-center'>
        <button onClick={send} className='btn text-white' style={{ backgroundColor: '#b47625' }}>Complain</button>
      </div>
      </div>
    </div>
  )
}



import {  useLocation, useNavigate } from 'react-router-dom'
import style from '../../Components/UserHomePage/UserProfile/Components/Services/Services.module.css'
import { useEffect, useState } from 'react';
import { getData, sendData } from '../Firebase/FirebaseMethod';
import Loader from '../../Loader';
import { toast, ToastContainer } from 'react-toastify';


export default function AllComplains() {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const loaction = useLocation();
  const id = loaction.pathname.split('/')[3];

  useEffect(() => {
    getData('complains').then((res: any) => {
      const fnal = Object.values(res)
      const arr: any[] = [];
      fnal.map((val: any) => {
        const c = Object.values(val);
        arr.push(...c)
        
        
      });
      const filterd = arr.filter((res: any) => res.customerid == id)
      id ?
        setData(filterd) :
        setData(arr)

    }).catch((er) => {
      console.log(er);

    })
  }, [])




  const changeStatus = (id: any, dat: string, customerid: any) => {
    const a = data.filter((val: any) => val.serviceid == id);
    const obj = a[0];
    const fnalObj = { ...obj, 'status': dat };



    sendData('complains', fnalObj, customerid, id).then(() => {
      sendData('userdata', fnalObj, customerid, 'complains', id).then(() => {

        toast.success('Status Changed')

      })
    })
  }

  const customerDetails = (id: any) => {
    navigate(`/home/booking/allBookings/${id}`)
  }



  return (
    <>
     <div className='text-center text-primary mt-4 mb-3'>
        <h1>All Complains</h1>
      </div>
      <ToastContainer />
      {
        data.length != 0 ?
          data.map((val: any, i: any) => {
            return (
              <div key={i} className={` ${val.status == 'completed' && style.disabled}  p-3 mt-2 `} style={{ backgroundColor: '#4790f0' }}>
                <div className='bg-white p-3 d-flex justify-content-between align-items-center'>
                  <div className=''>
                    <h6 style={{ color: '#b47625' }}>Complain Id:</h6>
                    {val.serviceid}
                  </div>
                 
                  <div className=''>
                    <h6 style={{ color: '#b47625' }}>Discription:</h6>
                    {val.description}
                  </div>
                  <div className=''>
                    <h6 style={{ color: '#b47625' }}>Status:</h6>
                    <h6 className={`${val.status == 'Submited' ? 'btn-danger' : val.status == 'under process' ? 'btn-warning' : 'bg-success'} btn text-white px-3 py-2 rounded-2 `}>{val.status}</h6>
                  </div>
                  {val.status == 'completed'?'':
                  <div className='d-flex flex-column'>

                    <button onClick={() => customerDetails(val.customerid)} type="button" className="btn btn-outline-danger">Customer Details</button>
                    <button onClick={() => changeStatus(val.serviceid, 'under process', val.customerid)} type="button" className="btn btn-outline-warning mt-2">Under Process</button>
                    <button onClick={() => changeStatus(val.serviceid, 'completed', val.customerid)} type="button" className="btn btn-outline-success  mt-2 ">Completed</button>
                  </div>}
                </div>
              </div>
            )
          }) :
          <div className='text-center'>
            <Loader />
          </div>
      }

    </>
  )
}
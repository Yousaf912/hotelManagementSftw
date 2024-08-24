import { useEffect, useState } from 'react'
import { getData, sendData } from '../Firebase/FirebaseMethod'
import Loader from '../../Loader';
import { TiTickOutline } from "react-icons/ti";
import style from './Allorder.module.css'

import { IoFastFoodOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export default function AllOrders() {
  const [allorders, setAllOrders] = useState<any>([]);
  const [rf,setRf]=useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const customeri = location.pathname.split('/')[3];
  


  useEffect(() => {
    getData('order').then((res: any) => {
      const fnal = Object.values(res);
    const b=   fnal.filter((res:any)=>res.customerid == customeri)
    customeri?
      setAllOrders(b):
      setAllOrders(fnal)
    })
  }, [rf])

  const changeStatus =(id:any,data:string,customerid:any)=>{
    const a = allorders.filter((val:any)=>val.foodid == id);
    const obj = a[0];
    const fnalObj = {...obj,'status':data};

    sendData('order',fnalObj,id).then(()=>{
      sendData('userdata',fnalObj,customerid,'orders',id).then(()=>{

        toast.success('Status Changed')
        setRf('')
      })
    })
  }

  const customerDetails = (id: any) => {
    navigate(`/home/booking/allBookings/${id}`)
  }


  return (
    <>
     <div className='text-center text-primary mt-4 mb-3'>
        <h1>All Food Orders</h1>
      </div>
      {allorders.length != 0 ?
        <div className='mb-5'>
          <ToastContainer/>
          {allorders.map((val: any, i: any) => {
            return (
              <div key={i} className={`${val.status == 'completed'? style.display :''} p-3 border mt-4 text-black col-12`} style={{ backgroundColor: '#4790f0' }}>
                <div className="bg-white flex-wrap align-items-center justify-content-between  d-flex " style={{ width: '100%' }}>
                  <div className="col-sm-3   ">
                    <img src={val.pic} style={{ width: '100%' }} />
                  </div>

                  <div className="col-sm-9 col-lg-6 ">
                    <div className="">
                      <strong>Name : </strong>
                      {val.title}
                    </div>
                    <div className="">
                      <strong>Type : </strong>
                      {val.foodtype}
                    </div>
                    <div>
                      <strong>ID:</strong>
                      {val.foodid}
                    </div>
                    <div>
                      <strong>Details : </strong>
                      {val.dis}
                    </div>
                    <div className={`border text-white col-5 text-center border-2 rounded-3 mt-3 ${val.status == 'cooking'?'bg-warning': val.status == 'Submited'?'bg-danger':'bg-success'}`}>
                      <strong>Status : </strong>
                      {val.status}
                    </div>
                  </div>
                  {val.status == 'completed'? '':
                  <div className="col-sm-5 col-lg-3 ">

                    <div className="d-flex flex-column  ">

                      <div className="btn btn-outline-danger mt-2" onClick={() => customerDetails(val.customerid)} >
                        <FaEye className="fs-3 me-2" />
                        <strong>Customer Details</strong>
                      </div>
                      <div className="btn btn-outline-warning mt-2" onClick={()=>changeStatus(val.foodid,'cooking',val.customerid)} >
                        <IoFastFoodOutline className="fs-3 me-2" />
                        <strong>Preparing</strong>
                      </div>
                      <div className="btn btn-outline-success mt-2" onClick={()=>changeStatus(val.foodid,'completed',val.customerid)} >
                        <TiTickOutline className="fs-3 me-2" />
                        <strong>Completed</strong>
                      </div>
                    </div>

                  </div>}


                </div>
              </div>
            )
          })}
        </div>

        : <div>
          <Loader />
        </div>
      }
    </>
  )
}

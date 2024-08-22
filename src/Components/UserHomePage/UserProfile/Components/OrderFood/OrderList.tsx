import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getData } from '../../../../Firebase/FirebaseMethod';
import { ToastContainer } from 'react-toastify';
import Loader from '../../../../../Loader';
import style from '../Bookings/Bookings.module.css'

export default function OrderList() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [allOrder, setAllOrder] = useState<any>([]);

  useEffect(() => {
    getData('userdata', id, 'orders').then((res: any) => {
      const fnal = Object.values(res)
      setAllOrder(fnal)
    })
  }, [])

  return (
    <>
      {allOrder.length != 0 ?
        <div className='mb-5'>
          {allOrder.map((val: any, i: any) => {
            return (
              <div key={i} className='p-3 mt-3  ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <div className='bg-white p-2 d-flex justify-content-between align-items-center'>
                  <img src={val.pic} width={160} />
                  <h6>{val.title}</h6>
                  <p>{val.dis}</p>
                  <div>
                    <h6>Order ID :</h6>
                    {val.foodid}
                  </div>
                  <p className={`mt-3 px-2  border ${val.status == 'Submited' ? 'bg-danger' : status === 'Preparing' ? 'bg-warning' : 'bg-success'} `}>{val.status}</p>
                </div>

              </div>

            )
          })}
        </div>

        : <div className='text-center'><Loader /></div>}
    </>
  )
}



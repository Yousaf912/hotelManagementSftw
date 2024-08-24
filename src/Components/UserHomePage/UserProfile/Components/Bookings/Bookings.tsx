import { useContext, useEffect, useState } from 'react';
import style from './Bookings.module.css'
import { ProfileStore } from '../../../../ContexStore/Store';
import { getData, uploadImage } from '../../../../Firebase/FirebaseMethod';
import Loader from '../../../../../Loader';
import { FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



export default function BookingsTwo() {
  const contx = useContext(ProfileStore)
  const [roomdata, setRoomData] = useState<any>([]);
  const navigate = useNavigate();
  const [file, setfile] = useState<any>();
  const location = useLocation();
  const id = location.pathname.split('/')[2];


  useEffect(() => {
    getData('userdata', id, 'booking').then((res: any) => {
      const fnal = Object.values(res)
      setRoomData(fnal)
    })
  }, [])



  const downloadSLip = (num: any) => {
    navigate(`/profile/${contx.id}/bookings/paymentslip/${num}`)
  }

  const getfile = (e: any) => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  }

  const upload = () => {
    if (file) {

      uploadImage(file, 'users', contx.id, 'paymentslip').then(() => {
        toast.success('Payment Slip is submint');
        setfile('');
      }).catch((er) => {
        console.log(er);

      })
    } else {
      toast.error('select file')
    }
  }



  return (
    <>
      {roomdata.length != 0 ?
        <div>
          {roomdata.map((val: any, i: any) => {
            return (
              <div  key={i}>
                <ToastContainer />
                <div>
                  {val.status == 'Paid' ?
                  <h6 className='text-success'>Payment Successfully Paid</h6>
                  :
                  <h6 className={`${style.notifi}`}>Your Payment Slip is ready Please Download it and Pay amount</h6>
                  }
                  </div>

                <div className={`${style.paymntdiv} border p-3 mt-3`}>
                  <div className='bg-white d-lg-flex  justify-content-between'>
                    <div className='d-flex col-lg-6'>
                      <div className='ms-2 mt-2 mb-2' >
                        <img src={val.url} width={140} />
                      </div>
                      <div className=' ms-3' >
                        <h6>{val.type}</h6>
                        <p>{`${val.dis.slice(1, 50)}....`}</p>
                      </div>
                    </div>


                    <div className='d-flex col-lg-6   justify-content-around'>

                      <div className='' >
                        <h6>Status</h6>
                        <p className={`mt-3 text-white px-3 py-1 rounded-2  border ${val.status == 'unpaid' ? 'bg-danger' : status === 'Pending' ? 'bg-warning' : 'bg-success'} `}>{val.status}</p>
                      </div>
                      {val.status == 'Paid'?'':
                      <>
                      <div className='' >
                        <h6 className='mb-3'>Download Slip</h6>
                        <div className='text-center '>
                          <FaDownload onClick={() => downloadSLip(val.roomnumber)} className={`${style.notifi} fs-3 `} style={{ cursor: "pointer" }} />

                        </div>
                      </div>
                      <div className=' col-3 ' >
                        <h6>Upload paid Slip</h6>
                        <input className={``} onChange={getfile} type="file" style={{ width: '100%' }} />
                        <button onClick={upload} className='btn btn-success ms-1 mt-1'>Submint</button>
                      </div></>}
                    </div>

                  </div>
                </div>


              </div>

            )
          })}
        </div>
        : <div className='text-center col-1 mx-auto'>
          <Loader />
        </div>
      }
    </>
  );
}


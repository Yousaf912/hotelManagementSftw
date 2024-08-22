import { useContext, useEffect, useState } from 'react';
import style from './Bookings.module.css'
import { ProfileStore } from '../../../../ContexStore/Store';
import { getData, uploadImage } from '../../../../Firebase/FirebaseMethod';
import Loader from '../../../../../Loader';
import { FaDownload } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



export default function BookingsTwo() {
  const contx = useContext(ProfileStore)
  const [roomdata, setRoomData] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [file, setfile] = useState<any>();
  const location = useLocation();
  const roomNumber: any = location.pathname.split('/')[4];
  const id = location.pathname.split('/')[2];
  const [arr, setarr] = useState<any>([]);
  const [allRooms, setAllRooms] = useState<any>([]);
  const [status,setStatus]=useState()


  useEffect(() => {

    getData('rooms').then((res: any) => {
      const room = Object.values(res)
      setAllRooms(room)
    })

    getData('userdata', id).then((res: any) => {
      const arr = Object.keys(res.booking);
      setarr(arr)
      
    })

  }, [roomNumber])

  useEffect(() => {

    if (roomNumber) {
      const filteredRooms = allRooms.filter((room: any) =>
        room.roomnumber === roomNumber
      );
      setRoomData(filteredRooms);


    } else {
      const b = allRooms.filter((val: any) => {
        return (
          arr.includes(val.roomnumber)
        )
      })
      setRoomData(b)

    }
    setLoader(false)

  }, [arr, allRooms])

  const downloadSLip = (num:any) => {
    navigate(`/profile/${contx.id}/bookings/paymentslip/${num}`)
  }

  const getfile = (e: any) => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0])
  }

  const upload = () => {
    if(file){

      uploadImage(file, 'users', contx.id, 'paymentslip').then((rs) => {
        toast.success('Payment Slip is submint');
        setfile('');
      }).catch((er) => {
        console.log(er);
  
      })
    }else{
      toast.error('select file')
    }
  }



  return (
    <>
      {roomdata.length != 0 ?
        <div>
          {roomdata.map((val: any, i: any) => {
            
            
            return (



              <div key={i}>
                <ToastContainer />
                <div>
                  <h6 className={`${style.notifi}`}>Your Payment Slip is ready Please Download it and Pay amount</h6>
                </div>
                {
                  loader ?
                    <div className='col-2 mx-auto mt-5'>
                      <Loader />
                    </div>
                    :
                    <div className={`${style.paymntdiv} border p-3 mt-3`}>
                      <div className='bg-white d-lg-flex  justify-content-between'>
                        <div className='d-flex col-lg-6'>
                          <div className='ms-2 mt-2 mb-2' >
                            <img src={val.url} width={140} />
                          </div>
                          <div className=' ms-3' >
                            <h6>{val.roomtype}</h6>
                            <p>{`${val.description.slice(1,50)}....`}</p>
                          </div>
                        </div>


                        <div className='d-flex col-lg-6   justify-content-around'>

                          <div className='' >
                            <h6>Status</h6>
                            <p className={`mt-3 px-2  border ${status == 'Unpaid'? 'bg-danger' : status === 'Pending'? 'bg-warning':'bg-success'} `}>{status}</p>
                          </div>
                         
                          <div className='' >
                            <h6 className='mb-3'>Download Slip</h6>
                            <div className='text-center '>
                              <FaDownload onClick={()=>downloadSLip(val.roomnumber)} className={`${style.notifi} fs-3 `} style={{ cursor: "pointer" }} />

                            </div>
                          </div>
                          <div className=' col-3 ' >
                            <h6>Upload paid Slip</h6>
                            <input className={``} onChange={getfile} type="file" style={{ width: '100%' }} />
                            <button onClick={upload} className='btn btn-success ms-1 mt-1'>Submint</button>
                          </div>
                        
                        </div>

                      </div>
                    </div>
                }

              </div>

            )
          })}
        </div>
: <div className='text-center col-1 mx-auto'>
  <Loader/>
</div>
      }
    </>
  );
}


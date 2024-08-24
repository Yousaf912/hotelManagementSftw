import { useContext, useEffect, useState } from 'react'
import { getData } from '../../Firebase/FirebaseMethod'
import Loader from '../../../Loader';
import style from './AvailableRoom.module.css'
import { useNavigate } from 'react-router-dom';
import { ComonStore} from '../../ContexStore/Store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Heading from '../SmallComponent/Heading';

export default function AvailabelRoom() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any>([])
    const navigate = useNavigate();
    const contx = useContext(ComonStore);


    useEffect(() => {
        getData('rooms').then((val: any) => {
            if (val) {
                const fnal = Object.values(val)
                const fnal2 =fnal.filter((res:any)=>{
                    return(res.roomstatus.includes('Available'))
                })
                setData(fnal2)
                setLoader(false)
            }

        }).catch((er) => {
            console.log(er);

        })
    }, [contx.isLogin])


    const book = (roomNumber: any) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                navigate(`/AllRooms/RoomBooking/${roomNumber}/${contx.userUid}`);
            } else {
                toast.error(' First Login to your account')
            }
        });
    };

    const allRooms=()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                navigate(`/AllRooms`);
            } else {
                toast.error(' First Login to your account')
            }
        });
    }

    return (
        <div className="container">

           <Heading smal={'Available Rooms'}/>
            <div className="row">
                <div className='d-flex justify-content-lg-around justify-content-between flex-wrap mb-5'>
                    {loader ?
                        <div className='col-2 mx-auto text-center'>
                            <Loader />
                        </div> :
                        data.slice(0,4).map((val: any, i: any) => {
                            return (

                                <div key={i} className={`${style.card} card mt-5 col-md-5 col-lg-4 ms-1`} >
                                    <img src={val.url} className={`${style.cardimg}`} alt="..." style={{ height: '200px' }} />
                                    <div className="card-body d-flex flex-column justify-content-between">

                                        <h5 className="card-title">{val.roomtype}</h5>
                                        <p className="card-text">{val.description.slice(0, 130)}</p>
                                        <div className='d-flex align-items-center'>
                                            <h4 style={{ color: "#bd883e" }}>Price: {val.roomprice}</h4>/per Day
                                        </div>

                                        <a onClick={() => book(val.roomnumber)} className="btn  mt-3" style={{ backgroundColor: '#bd883e', color: 'white' }}>Book</a>
                                    </div>
                                </div>


                            )
                        })

                    }
                </div>

            </div>

            <div className='col-sm-3 col-md-2 col-5 text-center mx-auto mt-4 mb-5'>
                <a onClick={allRooms} className="btn  mt-3" style={{ backgroundColor: '#bd883e', color: 'white', width: '100%' }}>All Rooms</a>
            </div>
        </div>
    )
}

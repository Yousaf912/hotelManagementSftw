import React, { useContext, useEffect, useState } from 'react'
import { getData } from '../../Firebase/FirebaseMethod'
import Loader from '../../../Loader';
import style from './AvailableRoom.module.css'
import { useNavigate } from 'react-router-dom';
import { StoreTwo } from '../../ContexStore/Store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function AvailabelRoom() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any>([])
    const navigate = useNavigate();
    const contx = useContext(StoreTwo);


    useEffect(() => {
        getData('rooms').then((val: any) => {
            if (val) {
                const fnal = Object.values(val)
                setData(fnal)
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
                navigate(`/RoomBooking/${roomNumber}`);
            } else {
                toast.error(' First Login to your account')
            }
        });
    };
    

    return (
        <div className="container">

            <div className={` position-relative col-4 mx-auto text-center mt-5 mb-5 `}  >
                <span style={{ color: '#c3a070' }}>Available Rooms</span>
                <h1 data-aos='zoom-in' data-aos-duration='2000' className={`${style.heading}  `}  >Featured Rooms</h1>
            </div>
            <div className="row">
                <div className='d-flex justify-content-between flex-wrap mb-5'>
                    {loader ?
                        <div className='col-2 mx-auto text-center'>
                            <Loader />
                        </div> :
                        data.map((val: any, i: any) => {
                            return (

                                <div key={i} className={`${style.card} card mt-3 col-3`} style={{ width: "18rem" }}>
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

            <div className='col-2 text-center mx-auto mt-4 mb-5'>
                <a href="#" className="btn  mt-3" style={{ backgroundColor: '#bd883e', color: 'white', width: '100%' }}>All Rooms</a>
            </div>
        </div>
    )
}

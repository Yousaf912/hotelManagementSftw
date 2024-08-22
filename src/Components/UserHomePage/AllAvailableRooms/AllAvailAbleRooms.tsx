import { useContext, useEffect, useState } from 'react'
import { getData } from '../../Firebase/FirebaseMethod'
import Loader from '../../../Loader';
import style from './AllAvailableRooms.module.css'
import { useNavigate } from 'react-router-dom';
import { ComonStore, StoreTwo } from '../../ContexStore/Store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { IoArrowBackCircle } from "react-icons/io5";
import Heading from '../SmallComponent/Heading';



export default function AllAvailAbleRooms() {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any>([])
    const navigate = useNavigate();
    const contx = useContext(ComonStore);
    const [inputValue, setInputValue] = useState();
    const [filterData, setFilterData] = useState<any>([]);
    const [id,setid]=useState();


    useEffect(() => {
        getData('rooms').then((val: any) => {
            if (val) {
                const fnal = Object.values(val);
                const fnal2 = fnal.filter((res:any)=>{
                    return(res.roomstatus.includes('Available'))
                })
                setData(fnal2)
                setFilterData(fnal2)
                setLoader(false)
            }

        }).catch((er) => {
            console.log(er);

        })
    }, [contx.isLogin])

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user:any) => {
            user && setid(user.uid)
        });
        return () => unsubscribe();
    }, []);



    const book = (roomNumber: any) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                navigate(`/AllRooms/RoomBooking/${roomNumber}/${id}`);
            } else {
                toast.error(' First Login to your account')
            }
        });
    };


    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);

        if (value === '') {
            setFilterData(data)
        } else {
            const filteredData = data.filter((val: any) =>
                val.roomtype.toLowerCase().includes(inputValue) ||
                val.roomprice.toLowerCase().includes(inputValue)

            );
            setFilterData(filteredData.length ? filteredData : []);
        }
    };

    const home =()=>{
        navigate('/')
    }

    return (
        <>
            <div className='position-fixed' style={{left:'30px',zIndex:'1'}}>
                <IoArrowBackCircle className='fs-1' onClick={home} style={{color:'#bd883e',cursor:'pointer'}}/>

            </div>

            <div className="container">

                <Heading smal={'All Available Rooms'}/>
                <div className={`${style.serch}  rounded-5 ps-3 col-md-6  col-lg-4 d-flex align-items-center justify-content-between`}>
                    <input onChange={handleSearch} type="text" placeholder='Search Room by Type/price .....' className='py-2' />
                    <button className='py-2 px-3 rounded-5'>Search</button>
                </div>
                <div className="row">
                    <div className='d-flex justify-content-lg-around justify-content-between flex-wrap mb-5'>
                        {loader ?
                            <div className='col-2 mx-auto text-center'>
                                <Loader />
                            </div> :
                            filterData.map((val: any, i: any) => {
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
            </div>

        </>
    )
}
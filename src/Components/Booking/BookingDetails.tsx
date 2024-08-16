import { useContext, useEffect, useRef, useState } from "react";
import { Store } from "../ContexStore/Store";
import { useNavigate } from "react-router-dom";
import { sendData } from "../Firebase/FirebaseMethod";
import { toast, ToastContainer } from "react-toastify";

export default function BookingDetails() {
    const contx = useContext(Store);
    const navigate = useNavigate();
    const [roomNum, setRoomNum] = useState(0);
    const [roomPrice, setRoomPrice] = useState(0);
    const [roomId, setRoomId] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bookingId, setBookingId] = useState<any>();
    const name = useRef<HTMLInputElement>(null);
    const cnic = useRef<HTMLInputElement>(null);
    const number = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLTextAreaElement>(null);
    const dis = useRef<HTMLTextAreaElement>(null);
    const checkIn = useRef<HTMLInputElement>(null);
    const checkOut = useRef<HTMLInputElement>(null);

    const generateRoomId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters[randomIndex];
        }
        setBookingId(result);
    };

    const getRoom = () => {
        const b = contx.dat.filter((val: any) =>
            val.roomstatus.includes('Available') && val.roomnumber.includes(contx.romNumFB)
        );
        if (b.length === 1) {
            const final = b[0];
            setRoomNum(final.roomnumber);
            setRoomPrice(final.roomprice);
            setRoomId(final.roomid);
            setRoomType(final.roomtype);
        }
    };

    useEffect(() => {
        getRoom();
        generateRoomId();
    }, []);

    const book = (e: any) => {
        e.preventDefault();

        if (
            !name.current?.value ||
            !cnic.current?.value ||
            !number.current?.value ||
            !address.current?.value ||
            !checkIn.current?.value ||
            !checkOut.current?.value ||
            !dis.current?.value
        ) {
            alert('Please fill all the fields');
        } else {
            const obj = {
                bookingid: bookingId,
                roomnumber: roomNum,
                roomid: roomId,
                roomprice: roomPrice,
                roomtype: roomType,
                name: name.current.value,
                cnic: cnic.current.value,
                number: number.current.value,
                address: address.current.value,
                description: dis.current.value,
                checkIn: checkIn.current.value,
                checkOut: checkOut.current.value
            };
            
            
            sendData('booking', obj, obj.roomnumber).then(() => {
                toast.success(`You Booked room ${obj.roomnumber}`)
                contx.setBookingdata(obj.roomnumber);
                navigate(`/home/booking/confirmDetails/${obj.roomnumber}`);
            }).catch((er) => {
                console.log(er);

            })

        }
    };

    return (
        <div className="p-3 mb-5" style={{ backgroundColor: '#4790f0' }}>
            <ToastContainer/>
            <div className="text-center text-white pb-1">
                <h1>Booking Information</h1>
            </div>
            <div>
                <form onSubmit={book}>
                    <div className={`p-3 col-12 text-white`} style={{ backgroundColor: '#023577' }}>
                        <div className='d-flex justify-content-between flex-wrap col-12'>
                            <div>
                                <h6>Room Id</h6>
                                <input value={roomId} readOnly type="text" />
                            </div>
                            <div>
                                <h6>Room Number</h6>
                                <input value={roomNum} readOnly type="number" />
                            </div>
                            <div>
                                <h6>Room Type</h6>
                                <input value={roomType} readOnly type="text" />
                            </div>
                            <div>
                                <h6>Price</h6>
                                <input value={roomPrice} type="number" readOnly />
                            </div>
                        </div>

                        <div className='d-md-flex justify-content-between col-12 mt-4'>
                            <div className='col-md-4'>
                                <h6>Booking Id</h6>
                                <input readOnly value={bookingId} type="text" style={{ width: '100%' }} />
                            </div>
                            <div className='col-md-4'>
                                <h6>CNIC</h6>
                                <input ref={cnic} required type="number" style={{ width: '100%' }} />
                            </div>
                            <div className='col-md-4'>
                                <h6>Contact Number</h6>
                                <input ref={number} required type="number" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className='d-md-flex justify-content-between col-12 mt-4'>
                            <div className='col-md-4'>
                                <h6>Name</h6>
                                <input ref={name} required type="text" style={{ width: '100%' }} />
                            </div>
                            <div className='col-md-4'>
                                <h6>CheckIn Date</h6>
                                <input ref={checkIn} required type="date" style={{ width: '100%' }} />
                            </div>
                            <div className='col-md-4'>
                                <h6>CheckOut Date</h6>
                                <input ref={checkOut} required type="date" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className='col-md-4 mt-2'>
                            <h6>Address</h6>
                            <textarea ref={address} required style={{ width: '100%' }} />
                        </div>

                        <div className='col-md-8 mt-3'>
                            <h6>Enter Description</h6>
                            <textarea ref={dis} required style={{ width: '100%' }} rows={5}></textarea>
                        </div>
                        <div className='d-flex'>
                            <div className={`col-md-4 mt-4 d-md-flex mx-auto`}>
                                <button className='px-5 py-2 border-0 text-white' type="submit" style={{ backgroundColor: '#bd9834' }}>
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


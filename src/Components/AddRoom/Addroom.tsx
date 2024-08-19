import { useContext, useEffect, useRef, useState } from 'react';
import style from './Addroom.module.css';
import { sendData } from '../Firebase/FirebaseMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../ContexStore/Store';

export default function Addroom() {
    const contx = useContext(Store);
    const id = useRef<any>(0);
    const [roomId, setRoomId] = useState<any>();
    const [romnbr,setRomnber] = useState<any>(0);
    const [price,setPrice] = useState<any>(0);
    const [description, setDescription] = useState<any>();
    const [status, setStatus] = useState<any>();
    const [type, setType] = useState<any>();
    const url = useRef<any>();

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

  

    const generateRoomId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters[randomIndex];
        }
        return result;
    };

    useEffect(() => {
        const id = generateRoomId();
        setRoomId(id);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        const obj = {
            roomid: id.current.value,
            roomnumber: romnbr,
            roomstatus: status,
            roomprice: price,
            roomtype: type,
            description: description,
            url:url.current.value,
        };
      
        
        e.preventDefault();
        if (obj.roomnumber === '') {
            toast.error('Room number is required');
        } else {
            sendData('rooms', obj, obj.roomnumber)
                .then(() => {
                    toast.success('Room is added successfully');
                    contx.setadata(1);
                    id.current.value = '';
                    setRomnber('');
                    setPrice('');
                    setStatus('');
                    setType('');
                    setDescription('');
                    const newId = generateRoomId();
                    setRoomId(newId);
                    url.current.value ='';
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Failed to add room');
                });
        }
    };

    return (
        <div className={`${style.main} p-4 text-white`}>
            <div className="container">
                <ToastContainer />
                <div className="row">
                    <div className="text-white text-center">
                        <h1>Add Rooms</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={`${style.inpt} p-3 col-12`}>
                            <div className='d-flex justify-content-between'>
                                <div className='col-5'>
                                    <h6>Room Id (auto Generated)</h6>
                                    <input readOnly value={roomId} ref={id} type="text" style={{ width: '100%' }} />
                                </div>
                                <div className='col-5'>
                                    <h6>Enter Room Number</h6>
                                    <input required value={romnbr} onChange={(e:any)=>setRomnber(e.target.value)} type="number" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='col-5'>
                                    <h6>Select Room Type</h6>
                                    <select value={type} required style={{ width: '100%' }} onChange={handleTypeChange}>
                                        <option selected disabled>Select</option>
                                        <option value="Single Room">Single Room</option>
                                        <option value="Double Room">Double Room</option>
                                        <option value="Suite Room">Suite Room</option>
                                        <option value="Deluxe Room">Deluxe Room</option>
                                        <option value="King Room">King Room</option>
                                        <option value="Queen Room">Queen Room</option>
                                        <option value="Party Hall">Party Hall</option>
                                        <option value="Garden">Garden</option>
                                        <option value="Roof">Roof</option>
                                    </select>
                                </div>
                                <div className='col-5'>
                                    <h6>Select Room Status</h6>
                                    <select value={status} required style={{ width: '100%' }} onChange={handleStatusChange}>
                                        <option selected disabled>Select</option>
                                        <option value="Available">Available</option>
                                        <option value="Occupied">Occupied</option>
                                        <option value="Cleaning">Cleaning</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <div className='col-5'>
                                    <h6>Enter Price</h6>
                                    <input required value={price} onChange={(e)=>setPrice(e.target.value)} type="number" style={{ width: '100%' }} />
                                </div>
                                <div className='col-5'>
                                    <h6>Pic Url</h6>
                                    <input required ref={url}  type="text" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className='col-8 mt-3'>
                                <h6>Enter Description</h6>
                                <textarea value={description} required onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} rows={5}></textarea>
                            </div>
                            
                            <div className='d-flex'>
                                <div className={`col-md-4 mt-4 ${style.btn} d-md-flex mx-auto`}>
                                    <button type="submit" className='px-5 py-2 border-0'>Add</button>
                                    <button type="reset" className='px-5 py-2 ms-md-2 mt-2 mt-md-0 border-0'>Clear</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

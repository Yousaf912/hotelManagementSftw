import  {  useEffect,  useState } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import { sendData } from '../Firebase/FirebaseMethod';

export default function AddStaff() {
    
    const [staffId,setStaffId]=useState<any>();
    const [name, setname] = useState<any>();
    const [number, setNber] = useState<any>();
    const [cnic, setCnic] = useState<any>();
    const [description, setDescription] = useState<any>();
    const[age,setAge]=useState<any>();
    const [adress, setAdress] = useState<any>();
    const [type, setType] = useState<any>();


    const generateRoomId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        let result = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters[randomIndex];
        }
        return result;
    };

    useEffect(() => {
        const id = generateRoomId();
        setStaffId(id);
    }, []);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const obj ={
            name:name,
            cnic:cnic,
            age:age,
            adress:adress,
            id:staffId,
            type:type,
            number:number,
            discription:description
        }
        if(obj.adress == '' || obj.age == '' || obj.cnic == ''|| obj.name === '' ||obj.type == '' ||obj.number ==''||obj.discription==''){
            toast.error('All filed are required')
        } else{

            sendData('staff',obj,obj.type,obj.name).then(()=>{
                toast.success(`${obj.name} is Added`);
                setname('');
                setCnic('');
                setAge('');
                setAdress('');
                setType('');
                setNber('');
                setDescription('')
                generateRoomId
            }).catch((er)=>{
                console.log(er);
            })
        }
    }
    
    return (
        <div style={{ backgroundColor: '#4790f0' }}>
            <div className={` p-4 text-white`} >
                <div className="container">
                    <ToastContainer />
                    <div className="row">
                        <div className="text-white text-center">
                            <h1>Add Staff</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={` p-3 col-12`} style={{ backgroundColor: "#023577" }}>
                                <div className='d-flex justify-content-between'>
                                    <div className='col-5'>
                                        <h6>Staff Id </h6>
                                        <input readOnly value={staffId}  type="text" style={{ width: '100%' }} />
                                    </div>
                                    <div className='col-5'>
                                        <h6>Select Staff Type</h6>
                                        <select value={type} required style={{ width: '100%' }} onChange={(e)=>setType(e.target.value)}>
                                            <option selected disabled value={''}>Select</option>
                                            <option value="Food and Beverage ">Food and Beverage </option>
                                            <option value="Reception">Reception</option>
                                            <option value="RoomKeeper">RoomKeeper</option>
                                            <option value="Sales and Marketing">Sales and Marketing</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Security">Security</option>
                                            <option value="Human Resources">Human Resources</option>
                                            <option value="Garden">Cook</option>
                                            <option value="Roof">Wahsroom Keeper</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <div className='col-5'>
                                        <h6>Enter Name</h6>
                                        <input required value={name} onChange={(e: any) => setname(e.target.value)} type="text" style={{ width: '100%' }} />
                                    </div>
                                    <div className='col-5'>
                                        <h6>Enter CNIC</h6>
                                        <input required value={cnic} onChange={(e: any) => setCnic(e.target.value)} type="number" style={{ width: '100%' }} />
                                    </div>

                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div className='col-5'>
                                        <h6>Contact Number</h6>
                                        <input required value={number} onChange={(e) => setNber(e.target.value)} type="number" style={{ width: '100%' }} />
                                    </div>
                                    <div className='col-5'>
                                        <h6>Enter Age</h6>
                                        <input required value={age} onChange={(e) => setAge(e.target.value)} type="number" style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div className='col-5 mt-3'>
                                    <h6>Enter Adress</h6>
                                    <textarea value={adress}  required onChange={(e) => setAdress(e.target.value)} style={{ width: '100%' }} rows={2}></textarea>
                                </div>
                                <div className='col-8 mt-3'>
                                    <h6>Enter Description</h6>
                                    <textarea value={description} required onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} rows={5}></textarea>
                                </div>
                                <div className='d-flex'>
                                    <div className={`col-md-4 mt-4  d-md-flex mx-auto`}>
                                        <button type="submit" className='text-white rounded-3 px-5 py-2 border-0' style={{backgroundColor:"#bd9834"}}>Add</button>
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

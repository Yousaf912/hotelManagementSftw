import React, { useContext, useEffect, useRef, useState } from 'react'
import { Store } from '../ContexStore/Store';
import { toast, ToastContainer } from 'react-toastify';
import { sendData } from '../Firebase/FirebaseMethod';
import style from './editstaff.module.css'; 

export default function EditStaff(props:{data:any}) {
    const{data}=props

    const contx = useContext(Store);
    const [staffId, setStaffId] = useState<any>();
    const [name, setname] = useState<any>();
    const [number, setNber] = useState<any>();
    const [cnic, setCnic] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [age, setAge] = useState<any>();
    const [adress, setAdress] = useState<any>();
    const [type, setType] = useState<any>();

    
    
    useEffect(() => {
        if(data.length != 0){
            const staf = data[0]
            setStaffId(staf.id);
            setname(staf.name);
            setNber(staf.number);
            setCnic(staf.cnic);
            setDescription(staf.discription);
            setAge(staf.age);
            setAdress(staf.adress);
            setType(staf.type)
          
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const obj = {
            name: name,
            cnic: cnic,
            age: age,
            adress: adress,
            id: staffId,
            type: type,
            number: number,
            discription: description
        }
        if (obj.adress == '' || obj.age == '' || obj.cnic == '' || obj.name === '' || obj.type == '' || obj.number == '' || obj.discription == '') {
            toast.error('All filed are required')
        } else {

            sendData('staff', obj, obj.type, obj.name).then(() => {
                toast.success(`${obj.name} is Editted`);
                setname('');
                setCnic('');
                setAge('');
                setAdress('');
                setType('');
                setNber('');
                setDescription('')
                setTimeout(() => {
                    contx.setEditStaf(!contx.editStaf)
                },5000);
            }).catch((er) => {
                console.log(er);
            })
        }
    }
    

    return (
        <div className={`${contx.editStaf? style.show: style.hide}`} >
            <div className={` p-4 text-white`} >
                <div className="container">
                    <ToastContainer />
                    <div className="row">
                        <div className="text-white text-center">

                            <h1>Add Staff</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={` p-3 col-12`} >
                                <div className='d-flex justify-content-between'>
                                    <div className='col-5'>
                                        <h6>Staff Id </h6>
                                        <input readOnly value={staffId} type="text" style={{ width: '100%' }} />
                                    </div>
                                    <div className='col-5'>
                                        <h6>Select Staff Type</h6>
                                        <select value={type} required style={{ width: '100%' }} onChange={(e) => setType(e.target.value)}>
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
                                        <input required value={name} readOnly type="text" style={{ width: '100%' }} />
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
                                    <textarea value={adress} required onChange={(e) => setAdress(e.target.value)} style={{ width: '100%' }} rows={2}></textarea>
                                </div>
                                <div className='col-8 mt-3'>
                                    <h6>Enter Description</h6>
                                    <textarea value={description} required onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} rows={5}></textarea>
                                </div>
                                <div className='d-flex'>
                                    <div className={`col-md-4 mt-4  d-md-flex mx-auto`}>
                                        <button type="submit" className='text-white rounded-3 px-5 py-2 border-0' style={{ backgroundColor: "#bd9834" }}>Add</button>

                                    </div>
                                </div>
                            </div>
                        </form>
                         <button onClick={()=>contx.setEditStaf(!contx.editStaf)} type="submit" className=' ms-2 text-white rounded-3 px-5 py-2 border-0' style={{ backgroundColor: "#bd9834" }}>Cancel</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getData, removeData } from '../Firebase/FirebaseMethod';
import EditStaff from './EditStaff';
import { Store } from '../ContexStore/Store';
import { toast, ToastContainer } from 'react-toastify';

export default function SingleStaff() {
    const contx =useContext(Store)
    const location = useLocation().pathname.split('/');
    const type = location[4];
    const id = location[5];
    const [data, setData] = useState<any>([])
    const navigate = useNavigate()


    useEffect(() => {
        getData(`staff/${type}`).then((val: any) => {
            const fnal = Object.values(val);
            const b = fnal.filter((nam: any) => {
                return (nam.id.includes(id))
            })
            setData(b)

        }).catch((er) => {
            console.log(er);

        })
    }, [contx.editStaf,contx.delt])

    const delet=(nm:any)=>{
        removeData('staff',type,nm).then(()=>{
            toast.success(`${nm} is deleted`);
            contx.setDelt(!contx.delt)
            setTimeout(() => {
                navigate('/home')
                
            }, 5000);
        })
    }


    return (
        <>
            <div className='position-relative'>
                <ToastContainer/>
                { contx.editStaf && <EditStaff data={data}/>}
                
                {data.map((val: any,i:any) => {
                    return (
                        <div className='' key={i}>

                            <div className='p-2' style={{ backgroundColor: '#4790f0' }}>
                                <div className='text-center'>
                                    <h1>Details of "{val.name}"</h1>
                                </div>
                            </div>
                            <div className='d-flex col-4 mt-4  mx-auto justify-content-between'>
                                <h5>Name:</h5>
                                <p>{val.name}</p>
                            </div>
                            <div className='d-flex col-4  mx-auto justify-content-between'>
                                <h5>Staff ID:</h5>
                                <p>{val.id}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Department:</h5>
                                <p>{val.type}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Adress:</h5>
                                <p>{val.adress}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Age:</h5>
                                <p>{val.age}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Number:</h5>
                                <p>{val.number}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Adress:</h5>
                                <p>{val.adress}</p>
                            </div>
                            <div className='d-flex col-md-4  mx-auto justify-content-between'>
                                <h5>Discription</h5>
                                <p>{val.discription}</p>
                            </div>
                            <div className='text-center mt-3'>
                                <button className='btn btn-success' onClick={()=>contx.setEditStaf(!contx.editStaf)}>Edit</button>
                                <button className='ms-2 btn btn-danger' onClick={()=>delet(val.name)}>Delete</button>
                            </div>


                        </div>)
                })}

            </div>

        </>
    )
}



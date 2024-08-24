import { useLocation } from 'react-router-dom'
import style from '../Services/Services.module.css'
import { useEffect, useState } from 'react';
import { getData } from '../../../../Firebase/FirebaseMethod';
import Loader from '../../../../../Loader';

export default function ComplainStatus() {
    const loaction = useLocation();
    const id = loaction.pathname.split('/')[2];
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getData('userdata', id, 'complains').then((res: any) => {
            const fnal = Object.values(res)
            setData(fnal)
        }).catch((er) => {
            console.log(er);

        })
    }, [])


    return (
        <>
            {
                data.length != 0 ?
                    data.map((val: any, i: any) => {
                        return (

                            <div  className={`${style.main} ${val.status == 'completed' && style.disabled}  p-3 mt-2 `}>
                                <div className='bg-white p-3 d-flex justify-content-between align-items-center'>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Complain Id:</h6>
                                        {val.serviceid}
                                    </div>
                                    
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Complain:</h6>
                                        {val.description}
                                    </div>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Status:</h6>
                                        <h6 className={`${val.status == 'Submited' ? 'btn-danger' : val.status == 'under process' ? 'btn-warning' : 'bg-success'} btn px-3 py-2 rounded-2 `}>{val.status}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                    <div className='text-center'>
                        <Loader />
                    </div>
            }

        </>
    )
}


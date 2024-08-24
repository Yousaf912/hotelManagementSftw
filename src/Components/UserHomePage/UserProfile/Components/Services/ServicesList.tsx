import { useLocation } from 'react-router-dom'
import style from './Services.module.css'
import { useEffect, useState } from 'react';
import { getData } from '../../../../Firebase/FirebaseMethod';
import Loader from '../../../../../Loader';

export default function ServicesList() {
    const loaction = useLocation();
    const id = loaction.pathname.split('/')[2];
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getData('userdata', id, 'services').then((res: any) => {
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

                            <div key={i} className={`${style.main} ${val.status == 'completed' && style.disabled}  p-3 mt-2 `}>
                                <div className='bg-white p-3 d-flex justify-content-between align-items-center'>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Service Id:</h6>
                                        {val.serviceid}
                                    </div>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Service Type:</h6>
                                        {val.service}
                                    </div>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Discription:</h6>
                                        {val.description}
                                    </div>
                                    <div className=''>
                                        <h6 style={{color:'#b47625'}}>Status:</h6>
                                        <h6 className={`${val.status == 'Submited' ? 'btn-danger' : val.status == 'under process' ? 'btn-warning' : 'bg-success'} btn text-white px-3 py-2 rounded-2 `}>{val.status}</h6>
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

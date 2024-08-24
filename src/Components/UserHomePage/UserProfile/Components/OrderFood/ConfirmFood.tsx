import  { useEffect, useState } from 'react'
import { getData, sendData } from '../../../../Firebase/FirebaseMethod'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../../../Loader';
import { toast, ToastContainer } from 'react-toastify';

export default function ConfirmFood() {
    const [allData, setAllData] = useState<any>([]);
    const location = useLocation();
    const foodName = location.pathname.split('/')[7];
    const foodId = location.pathname.split('/')[6];
    const customerId = location.pathname.split('/')[2];
    const navigate = useNavigate();

    useEffect(() => {
        getData('foods').then((val: any) => {
            const fnal = val[foodName].items
            const b = fnal.filter((res: any) => {
                return (
                    res.id == foodId
                )
            })
            setAllData(b);
        }).catch((er) => {
            console.log(er);

        })
    }, [])



    const confirm = (pic:any,title:any,dis:any) => {
        const obj = {
            customerid: customerId,
            foodid: foodId,
            foodtype: foodName,
            status:'Submited',
            pic,
            title,
            dis
        }

        if (!obj.customerid && !obj.foodid && !obj.foodtype) {
            toast.error('Please try again we are facing eror')
        } else {
            sendData('order', obj, obj.foodid).then(() => {
                sendData('userdata', obj, obj.customerid, 'orders', obj.foodid).then(() => {
                    toast.success('Successfully Submited')
                    setTimeout(() => {
                
                        navigate(`/profile/${customerId}/orderfood/order`)
                    }, 3000);
                }).catch((er) => {
                    console.log(er);

                })
            }).catch((er) => {
                toast.error('we are facing eror')
                console.log(er);

            })
        }
    }



    return (
        <div>
            <ToastContainer />
            {allData.length == 0 ?
                <div className='text-center'>
                    <Loader />
                </div> :
                <div>
                    {allData.map((val: any, i: any) => {
                        return (
                            <div key={i} className="card col-4" >
                                <img src={val.pic} className="card-img-top" style={{ width: '100%' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{val.title}</h5>
                                    <p className="card-text">{val.description}</p>
                                    <a onClick={()=>confirm(val.pic,val.title,val.description)} className="btn btn-primary">Confirm This</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

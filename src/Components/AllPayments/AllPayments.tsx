import { useEffect, useState } from "react"
import { getData, getImageURL, sendData } from "../Firebase/FirebaseMethod"
import { useLocation, useNavigate } from "react-router-dom"
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";

export default function AllPayments() {
    const loaction = useLocation();
    const customerid = loaction.pathname.split('/')[3];
    const [imgurl, setImgurl] = useState<any>();
    const [customerData, setCustomerData] = useState<any>();
    const navigate =useNavigate()

    useEffect(() => {
        getImageURL('users/', customerid, 'paymentslip').then((val: any) => {
            setImgurl(val)

        })
    
            getData('userdata', customerid, 'booking').then((res: any) => {
                const b = Object.values(res)
                const c = b.filter((res: any) => res.customerid == customerid);
                setCustomerData(c)

            })
    
    }, [])

    const changestaus =(value:any)=>{
        const obj = customerData[0]
        const fnalObj = {...obj,status:value};
        console.log(fnalObj);

        sendData('userdata',fnalObj,customerid,'booking',fnalObj.roomnumber).then(()=>{
            sendData('booking',fnalObj,fnalObj.roomnumber).then(()=>{
                toast.success('Status is updated');
                setTimeout(() => {
                    navigate('/home/allusers')
                }, 3000);
            })
        })
        
    }




    return (
        <>
        <ToastContainer/>
            {imgurl ?
                <div>
                    <img src={imgurl} alt="" />
                    <div>
                        <button onClick={()=>changestaus('Paid')} type="button" className="btn btn-outline-success">Paid</button>
                        <button type="button" className="btn ms-2 btn-outline-danger">Unpaid</button>
                    </div>
                </div> :
                <div className="text-center">
                    <Loader />
                </div>
            }
        </>
    )
}

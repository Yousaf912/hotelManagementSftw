import { useContext } from "react"
import { Store } from "../ContexStore/Store"
import Loader from "../../Loader";
import img from '../../assets/imege.jpg'
import { IoMdHome } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineCleaningServices } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaSackDollar } from "react-icons/fa6";



export default function AllUserList() {
    const contx = useContext(Store);

    const navigate = useNavigate();

    const goTOBooking = (e: any) => {
        navigate(`/home/booking/allBookings/${e}`)
    }
    const goToComplain = (id: any) => {
        navigate(`/home/allcomplains/${id}`)
    }
    const goToOrder = (id: any) => {
        navigate(`/home/allorders/${id}`)
    }
    const goToService = (id: any) => {
        navigate(`/home/allservicesrequests/${id}`)
    }

    const goToPayment = (id:any) => {
        navigate(`/home/allpayments/${id}`)
    }

    return (
        <>
            {contx.allUsers.length != 0 ?
                <>
                    {contx.allUsers.map((val: any, i: any) => {


                        return (

                            <div key={i} className="p-3 border mt-4 text-black col-12" style={{ backgroundColor: '#4790f0' }}>
                                <div className="bg-white flex-wrap align-items-center justify-content-between  d-flex " style={{ width: '100%' }}>
                                    <div className="col-sm-3   ">
                                        <img src={img} style={{ width: '100%' }} />
                                    </div>

                                    <div className="col-sm-9 col-lg-6">
                                        <div className="">
                                            <strong>Name : </strong>
                                            {val.name}
                                        </div>
                                        <div>
                                            <strong>Email Adress:</strong>
                                            {val.mail}
                                        </div>
                                        <div>
                                            <strong>User ID : </strong>
                                            {val.id}
                                        </div>
                                    </div>
                                    <div className="col-sm-5 col-lg-3 ">
                                        {val.booking ?
                                            <div className="d-flex flex-column p-1 ">
                                                <div onClick={() => goTOBooking(val.id)} className="btn btn-outline-primary" >
                                                    <IoMdHome className="fs-3 me-2" />
                                                    <strong>Bookings</strong>
                                                </div>
                                                <div onClick={() => goToComplain(val.id)} className="btn btn-outline-danger mt-2" >
                                                    <RiCustomerServiceFill className="fs-3 me-2" />
                                                    <strong>Complains</strong>
                                                </div>
                                                <div onClick={() => goToOrder(val.id)} className="btn btn-outline-warning mt-2" >
                                                    <IoFastFoodOutline className="fs-3 me-2" />
                                                    <strong>Orders</strong>
                                                </div>
                                                <div onClick={() => goToService(val.id)} className="btn btn-outline-success mt-2" >
                                                    <MdOutlineCleaningServices className="fs-3 me-2" />
                                                    <strong>Service Request</strong>
                                                </div>
                                                <div onClick={() => goToPayment(val.id)} className="btn btn-outline-info mt-2" >
                                                    <FaSackDollar className="fs-3 me-2" />
                                                    <strong>Payment Slip</strong>
                                                </div>
                                            </div> :
                                            <div className="text-danger text-center ">
                                                <h5>This user do not have any room booking</h5>
                                            </div>
                                        }
                                    </div>


                                </div>
                            </div>

                        )
                    })}

                </>







                : <div className="text-center mt-5 pt-5">
                    <Loader />
                </div>

            }
        </>
    )
}

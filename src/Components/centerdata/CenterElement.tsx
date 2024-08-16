// export default function Elmnt() {
//     const name = useContext(Store);

    

//     const obj: any = {
//         'singlestudent':<SingleStudentDetail/>,
//         'teachersinglepage':<TeacherDetailPage/>,
        
//     }

//     const element = obj[name.singlepage] || obj[name.arrow] ||  obj[ name.nestdli ] ;


//     return (
//         <div>{element}</div>
//     )
// }


import { useLocation } from 'react-router-dom'
import Addroom from '../AddRoom/Addroom';
import RoomList from '../AddRoom/RoomList';
import Booking from '../Booking/Booking';
import BookingDetails from '../Booking/BookingDetails';
import ConfirmBooking from '../Booking/ConfirmBooking';
import BookingPrice from '../Booking/BookingPrice';
import AllBookingList from '../Booking/AllBookingList';
import SinglePerson from '../SInglePersonDetails/SinglePerson';
import AddStaff from '../Staff/AddStaff';
import StaffList from '../Staff/StaffList';
import SingleStaff from '../Staff/SingleStaff';
import Home from '../Home/Home';
import Cleaning from '../../CleaningRooms/Cleaning';

export default function CenterElement() {
    const urlname = useLocation();
    const name1 =urlname.pathname.split('/')[1];
    const name =urlname.pathname.split('/')[2];
    const nstdName = urlname.pathname.split('/')[3];
  
    
    
    const obj:any ={
        'addRoom':<Addroom/>,
        'roomlist':<RoomList/>,
        'booking':<Booking/>,
        'bookingDetails':<BookingDetails/>,
        'confirmDetails':<ConfirmBooking/>,
        'confirmPrice':<BookingPrice/>,
        'allBookings':<AllBookingList/>,
        'customer':<SinglePerson/>,
        'addstaff':<AddStaff/>,
        'stafflist':<StaffList/>,
        'SingleSstaff':<SingleStaff/>,
        'home':<Home/>,
        'underCleanRooms':<Cleaning/>
    }
    const element = obj[nstdName] || obj[name] || obj[name1]
    
  return (
    <div>{element}</div>
  )
}

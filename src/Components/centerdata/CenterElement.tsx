


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
import AddMeals from '../AddMeals/AddMeals';
import ListOfMeals from '../AddMeals/ListOfMeals';
import AllUserList from '../AllUsers/AllUserList';
import AllOrders from '../AllOrders/AllOrders';
import AllComplains from '../AllComplains/AllComplains';
import AllservicesRequest from '../AllServicesRequest/AllservicesRequest';
import AllPayments from '../AllPayments/AllPayments';

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
        '':<Home/>,
        'underCleanRooms':<Cleaning/>,
        'addfood':<AddMeals/>,
        'foodlist':<ListOfMeals/>,
        'allusers':<AllUserList/>,
        'allorders':<AllOrders/>,
        'allcomplains':<AllComplains/>,
        'allservicesrequests':<AllservicesRequest/>,
        'allpayments':<AllPayments/>
    }
    const element = obj[nstdName] || obj[name] || obj[name1]
    
  return (
    <div>{element}</div>
  )
}

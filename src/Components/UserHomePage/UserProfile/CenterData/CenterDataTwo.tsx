import React from 'react'
import { useLocation } from 'react-router-dom'
import Profile from '../Components/Profile/Profile';
import Services from '../Components/Services/Services';
import BookingsTwo from '../Components/Bookings/Bookings';
import Complains from '../Components/Complains/Complains';
import OrderFood from '../Components/OrderFood/OrderFood';
import Slip from '../Components/AmountSLip/Slip';

export default function CenterDataTwo() {
const location = useLocation();
const name = location.pathname.split('/')[3];
const name2 = location.pathname.split('/')[4];

const data:any = {
    'profile':<Profile/>,
    'services':<Services/>,
    'bookings':<BookingsTwo/>,
    'complains':<Complains/>,
    'orderfood':<OrderFood/>,
    'paymentslip':<Slip/>
}
const element = data[name2] || data[name]

  return (
    <div>
        {element}
    </div>
  )
}


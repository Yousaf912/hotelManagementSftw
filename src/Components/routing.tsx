import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn/SIgnIn";
import Signup from "./SignUp/SignUp";
import App from "../App";
import UserHomePage from "./UserHomePage/UserHomePage";
import CustomerBooking from "./UserHomePage/CustomerBooking/CustomerBooking";


export const AllRoutes = createBrowserRouter([
    {
        path:'/SignUp',
        element:<Signup/>
    },
    {
        path:'/',
        element:<UserHomePage/>
    },
    {
        path:'/login',
        element:<SignIn/>
    },
    {
        path:'/home',
        element:<App/>
    },
    {
        path:'/home/addRoom',
        element:<App/>
    },
    {
        path:'/home/roomlist',
        element:<App/>
    },
    {
        path:'/home/booking',
        element:<App/>
    },
    {
        path:'/home/bookingDetails',
        element:<App/>
    },
    {
        path:'/home/booking/confirmDetails/:id',
        element:<App/>
    },
    {
        path:'/home/booking/confirmPrice/:id',
        element:<App/>
    },
    {
        path:'/home/booking/allBookings',
        element:<App/>
    },
    {
        path:'/home/customer/:id',
        element:<App/>
    },
    {
        path:'/home/addstaff',
        element:<App/>
    },
    {
        path:'/home/stafflist',
        element:<App/>
    },
    {
        path:'/home/staff/SingleSstaff/:type/:id',
        element:<App/>
    },
    {
        path:'/home/underCleanRooms',
        element:<App/>
    },
    {
        path:'/RoomBooking/:id',
        element:<CustomerBooking/>
    },
])
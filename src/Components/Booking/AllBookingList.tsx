import { useContext, useEffect, useState } from "react";
import { Store } from "../ContexStore/Store";
import { IoIosPerson } from "react-icons/io";
import { getData, removeData } from "../Firebase/FirebaseMethod";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AllBookingList() {
  const data = useContext(Store)
  const nevigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');
  const [allBooking, setAllBooking] = useState<any>([]);
  const [filteredBookings, setFilteredBookings] = useState<any>([]);


  useEffect(() => {
    getData('booking').then((val: any) => {
      setAllBooking(Object.values(val))
      setFilteredBookings(Object.values(val))
      
    }).catch((er) => {
      console.log(er);
    })
  }, [data.delt])

  const handleSearch = (e: any) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === '') {
      setFilteredBookings(allBooking);
    } else {
      const filtered = allBooking.filter((val: any) =>
        val.roomnumber.toLowerCase().includes(value) ||
        val.bookingid.toLowerCase().includes(value) ||
        val.roomid.toLowerCase().includes(value) ||
        val.name.toLowerCase().includes(value) ||
        val.checkIn.includes(value)
      );
      setFilteredBookings(filtered);
    }
  };


  const singlePerson = (num: any) => {
    nevigate(`/home/customer/${num}`)
  }
  return (

    <div className={`p-2 text-white `} style={{ backgroundColor: '#4790f0',width:"100%" }}>
      <ToastContainer/>
      <div className='text-center'>
        <h1>All Bookings</h1>
      </div>
      <div className='d-flex ms-2'>
        <h5>Search Room: </h5>
        <input
          value={searchValue}
          onChange={handleSearch}
          type="text"
          placeholder='Search room'
          className='border-0 rounded-4 mb-2 ms-2 ps-2 py-1'
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Room #</th>
            <th scope="col">Booking Id</th>
            <th scope="col">Name</th>
            <th scope="col">CheckIn Date</th>
            
            <th scope="col">About</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((val: any, i: number) => (
            <tr key={i}>
              <th scope="row">{val.roomnumber}</th>
              <td>{val.bookingid}</td>
              <td>{val.name}</td>
              <td>{val.checkIn}</td>

              <td onClick={() => singlePerson(val.bookingid)}><IoIosPerson className='fs-4' style={{ color: '#bd9834', cursor: 'pointer' }} /> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}



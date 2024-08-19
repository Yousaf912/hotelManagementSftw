import { useContext, useEffect, useState } from 'react';
import { Store } from '../ContexStore/Store';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



export default function Booking() {
  const navigate  =useNavigate();
  const data = useContext(Store);
  const [searchValue, setSearchValue] = useState('');
  const [availableRoom, setAvailableRoom] = useState([]);

  console.log(data.dat);
  

  useEffect(() => {
    const availableRooms = data.dat.filter((val: any) =>

      val.roomstatus.includes('Available')

    );

    setAvailableRoom(availableRooms);
  }, [data.dat,data.delt]);

  console.log(availableRoom);
  

  const handleSearch = (e:any) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === '') {
      const availableRooms = data.dat.filter((val: any) =>
        val.roomstatus.includes('Available')
      );
      setAvailableRoom(availableRooms);
    }
     else {
  
      const filteredRooms = availableRoom.filter((val: any) =>
        
        val.roomnumber.toLowerCase().includes(value) ||
        val.roomtype.toLowerCase().includes(value) ||
        val.roomprice.toLowerCase().includes(value) 
      );
      setAvailableRoom(filteredRooms) 
    }
  };

  const bookit =(num:any)=>{
    data.setRomNumFb(num);
    navigate('/home/bookingDetails')
  }

  return (
    <div className={`p-2 text-white`} style={{backgroundColor:'#4790f0'}}>
      <div className='text-center'>
        <h1>Available Room</h1>
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
            <th scope="col">Number</th>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Book</th>
          </tr>
        </thead>
        <tbody>
          {availableRoom.map((val: any, i: number) => (
            <tr key={i}>
              <th scope="row">{val.roomnumber}</th>
              <td>{val.roomtype}</td>
              <td>{val.roomprice}</td> 
              <td>{`${val.description.slice(0,70)}......`}</td> 
              <td onClick={()=>bookit(val.roomnumber)}><FaPlus className='fs-4' style={{color:'#bd9834', cursor:'pointer'}}/> </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


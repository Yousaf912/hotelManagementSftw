import { useContext, useEffect, useState } from 'react';
import { Store } from '../Components/ContexStore/Store';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



export default function Cleaning() {
  const navigate  =useNavigate();
  const data = useContext(Store);
  const [searchValue, setSearchValue] = useState('');
  const [availableRoom, setAvailableRoom] = useState([]);
  const [loader,setloader]=useState(true)

  console.log(data.dat);
  

  useEffect(() => {
    const availableRooms = data.dat.filter((val: any) =>

      val.roomstatus.includes('Cleaning')

    );

    setAvailableRoom(availableRooms);
  
  }, [data.dat,data.delt]);

  console.log(availableRoom);
  

  const handleSearch = (e:any) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value === '') {
      const availableRooms = data.dat.filter((val: any) =>
        val.roomstatus.includes('Cleaning')
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

 

  return (
    <div className={`p-2 text-white`} style={{backgroundColor:'#4790f0'}}>
      <div className='text-center'>
        <h1>Cleaning Room</h1>
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
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {availableRoom.map((val: any, i: number) => (
            <tr key={i}>
              <th scope="row">{val.roomnumber}</th>
              <td>{val.roomtype}</td>
              <td>{val.roomprice}</td> 
              <td>{val.description}</td> 
              <td>{val.roomstatus}</td> 
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}
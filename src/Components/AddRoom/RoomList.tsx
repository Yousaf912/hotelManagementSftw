import { useContext,  useState } from 'react';
import style from './RoomList.module.css';
import { FaRegEdit } from "react-icons/fa";
import EditRoom from './EditRoom';
import { Store } from '../ContexStore/Store';
import Loader from '../../Loader';

export default function RoomList() {
    const dat = useContext(Store);
    const [searchValue, setSearchValue] = useState<string>('');

    const edit = (roomNum: number) => {
        dat.setShowEdit(!dat.showEdit);
        dat.seteditList(roomNum);
    };

    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
    
        if (value === '') {
            dat.setDet(dat.dat);
        } else {
            const filteredData = dat.dat.filter((val: any) => 
                val.roomnumber.toLowerCase().includes(value) || 
                val.roomid.toLowerCase().includes(value) || 
                val.roomtype.toLowerCase().includes(value)||
                val.roomstatus.toLowerCase().includes(value)
            );
            dat.setDet(filteredData.length ? filteredData : []);
        }
    };
    

    return (
        <div className={`${style.main} text-white text-center p-3 mt-5`}>
            <EditRoom />
            <h1>Rooms List</h1>
            <div className={`${style.inpt}`}>
                <div className='d-flex align-items-center mb-3 '>
                    <h6>Search: </h6>
                <input className='ms-2 border-0 rounded-5 px-3 py-2' type="text" value={searchValue} onChange={handleSearch} placeholder="Search room " />
                </div>
                <table className={`${style.inpt} table table-hover`}>
                    <thead>
                        <tr>
                            <th scope="col">Number</th>
                            <th scope="col">Room Id</th>
                            <th scope="col">Status</th>
                            <th scope="col">Room Type</th>
                            <th scope="col">Price</th>
                            <th>Edit Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dat.det.length > 0 ? (
                           dat.det.map((val: any, i: any) => (
                                <tr key={i}>
                                    <th scope="row">{val.roomnumber}</th>
                                    <td>{val.roomid}</td>
                                    <td>{val.roomstatus}</td>
                                    <td>{val.roomtype}</td>
                                    <td>{val.roomprice}</td>
                                    <td><FaRegEdit className='fs-4' style={{ color: "#bd9834", cursor: 'pointer' }} onClick={() => edit(val.roomnumber)} /></td>
                                </tr>
                            ))
                        ) : (
                        
                               <Loader/>
                            
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

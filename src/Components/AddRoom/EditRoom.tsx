import { useContext, useEffect,  useState } from 'react';
import style from './editRoom.module.css';
import { Store } from '../ContexStore/Store';
import { RxCross1 } from "react-icons/rx";
import { getData, sendData } from '../Firebase/FirebaseMethod';


export default function EditRoom() {
  const data = useContext(Store);
  const [romid, setRoomid] = useState();
  const [romNumber,setRoomNumber]=useState();
  const [roomType,setRoomType]=useState();
  const [roomStatus,setRoomstatus]=useState();
  const [roomPrice,setRoomPrice]=useState();
  const [discrip,setDiscript]=useState();


  const hide = () => {
    data.setShowEdit(!data.showEdit)
  }

  useEffect(() => {
    getData(`rooms/${data.editlist}`).then((data: any) => {
      if (data) {
        const fnal = data;
        setRoomid(fnal.roomid)
        setRoomNumber(fnal.roomnumber);
        setRoomType(fnal.roomtype);
        setRoomstatus(fnal.roomstatus);
        setRoomPrice(fnal.roomprice);
        setDiscript(fnal.description)
      }

    }).catch((er) => {
      console.log(er);
    })
  }, [data.editlist])
  

  const chngPrice =(e:any)=>{
    setRoomPrice(e.target.value)
  }
  const chngStatus =(e:any)=>{
    setRoomstatus(e.target.value)
  }
  const chngType =(e:any)=>{
    setRoomType(e.target.value)
  }
  const chngDis =(e:any)=>{
    setDiscript(e.target.value)
  }
  
  const obj ={
    roomid:romid,
    roomnumber:romNumber,
    roomtype:roomType,
    roomstatus:roomStatus,
    roomprice:roomPrice,
    description:discrip
  }
  const edit=(e:any)=>{
    e.preventDefault();
    sendData('rooms',obj,obj.roomnumber).then(()=>{
      alert('data edit')
      data.setShowEdit(!data.showEdit)
    }).catch((er)=>{
      console.log(er);
      
    })
  }


  return (
    <div className={`${data.showEdit ? style.show : style.main} col-7`}>
      <div className={`${style.cros}`} onClick={hide}>
        <RxCross1 />
      </div>
      <h1>Edit Data</h1>
      <form action="">
        <div className={`${style.inpt} p-3 col-12`}>
          <div className='d-flex justify-content-between'>
            <div className=' col-5'>
              <h6>Room Id (auto Generated)</h6>
              <input readOnly value={romid} type="text" style={{ width: '100%' }} />
            </div>
            <div className=' col-5'>
              <h6>Enter Room Number</h6>
              <input readOnly value={romNumber} type="number" style={{ width: '100%' }} />
            </div>
          </div>
          <div className='d-flex justify-content-between mt-4'>
            <div className=' col-5'>
              <h6>Select Room Type</h6>
              <select required style={{ width: '100%' }} onChange={chngType} value={roomType}>
                <option value="Single Room">Single Room</option>
                <option value="Double Room">Double Room</option>
                <option value="Suite Room">Suite Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="King Room">King Room</option>
                <option value="Queen Room">Queen Room</option>
              </select>
            </div>
            <div className=' col-5'>
              <h6>Select Room Status</h6>
              <select required onChange={chngStatus} style={{ width: '100%' }} value={roomStatus} >
                <option value="select" selected>select</option>
                <option value="Available">Avaiable</option>
                <option value="Occupied">Occupied</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

          </div>
          <div className='d-flex justify-content-between mt-3'>
            <div className=' col-5'>
              <h6>Enter Price</h6>
              <input required type="number" onChange={chngPrice} style={{ width: '100%' }} value={roomPrice} />
            </div>

          </div>
          <div className='col-8 mt-3'>
            <h6>Enter Discription</h6>
            <textarea required onChange={chngDis} style={{ width: '100%' }} rows={5} value={discrip}></textarea>
          </div>
          <div className='d-flex'>
            <div className={`col-md-4 mt-4 ${style.btn} d-md-flex mx-auto  `} >
              <button className='px-5 py-2 border-0' onClick={edit} >Edit</button>
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}

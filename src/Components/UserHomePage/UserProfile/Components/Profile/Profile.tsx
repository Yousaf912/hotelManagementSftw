import  { useContext } from 'react'
import { ProfileStore } from '../../../../ContexStore/Store';
import img from '../../../../../assets/imege.jpg'

export default function Profile() {
  const contx = useContext(ProfileStore);
  console.log(contx.data);

  return (
    <div className='p-3 col-11' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className='bg-white'>
      <div className='text-center  mb-5 pt-3 '>
        <h1 >Personal Details of "{contx.data.name}" </h1>
      </div>
      <div className='d-flex align-items-center justify-content-around '>
        <div className='col-4'>
          <img src={img} style={{ width: '100%' }} />
        </div>
        <div >
          <div className='d-flex'>
            <h6 className='me-3 mt-1'>Name: </h6>
            {contx.data.name}
          </div>
          <div className='d-flex'>
            <h6 className='me-3 mt-1'>Email: </h6>
            {contx.data.mail}
          </div>
          {contx.data.booking && <>
            <div className='d-flex'>
              <h6 className='me-3 mt-1'>Number: </h6>
              {contx.data.booking.number}
            </div>
            <div className='d-flex'>
              <h6 className='me-3 mt-1'>CNIC Number: </h6>
              {contx.data.booking.cnic}
            </div>
            <div className='d-flex'>
              <h6 className='me-3 mt-1'>Adress: </h6>
              {contx.data.booking.address}
            </div>
          </>}
        </div>
      </div>
      </div>
    </div>
  )
}

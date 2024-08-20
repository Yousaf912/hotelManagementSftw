import style from './HeaderTwo.module.css';
import logo from '../../../../assets/rani logo.png'
import { useNavigate } from 'react-router-dom';

export default function HeaderTwo() {
  const navigate = useNavigate();

  const home=()=>{
    navigate('/')
  }
  return (
    <div className={`${style.main} `}>
      <div className="container">
        <div className='d-flex align-items-center justify-content-between'>
          <div className={`${style.imgdiv} col-md-2 col-xl-1 col-4 col-sm-3  `}>
            <img src={logo} alt="" />
          </div>
          <div className=' col-6 col-sm-4 col-lg-3'>
            <button onClick={home} className={`${style.btn} py-2 px-3 rounded-3 text-white`}>Back To Home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

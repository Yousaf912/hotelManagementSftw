import style from './HeaderTwo.module.css';
import logo from '../../../../assets/rani logo.png'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";



export default function HeaderTwo() {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(window.innerWidth < 768);
  const [menu, setMenu] = useState(false)


  const handleResize = () => {
    setShowSideBar(window.innerWidth < 768)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const home = () => {
    navigate('/')
  }


  return (
    <div className={`${style.main} `}>
      <div className={`${showSideBar ? 'container-fluid' : 'container'} `}>
        <div className='d-flex align-items-center justify-content-between'>
          <div className={`${style.imgdiv} col-md-2 col-xl-1 col-4 col-sm-3  `}>
            <img src={logo} alt="" />
          </div>
          <div className='position-relative col-4 col-sm-3 col-lg-3 d-flex justify-content-between'>
            <button onClick={home} className={`${style.btn} py-2 px-3 rounded-3 text-white`}>Home</button>

            {showSideBar &&
              <div >
                <GiHamburgerMenu onClick={() => setMenu(!menu)} className='fs-1 ' style={{ color: '#a37e4c' }} />
                
                  <ul className={menu ? style.show : style.manu}>
                    <li>Profile</li>
                    <li>Bookings</li>
                    <li>Services</li>
                  </ul>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

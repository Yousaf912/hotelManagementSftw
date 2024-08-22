import video from '../../../assets/202408182054 (1).mp4';
import Footer from '../Footer/Footer';
import style from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <>
    <video autoPlay loop muted className={`${style.main}`} >
            <source src={video} type='video/mp4' />
        </video>
    </>
  )
}

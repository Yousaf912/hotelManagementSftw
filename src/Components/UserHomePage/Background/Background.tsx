import video1 from '../../../assets/202408182054.mp4';
import style from './background.module.css'

export default function Background() {
    
    return (
        <video autoPlay loop muted className={`${style.main}`} >
            <source src={video1} type='video/mp4' />
        </video>
    )
}

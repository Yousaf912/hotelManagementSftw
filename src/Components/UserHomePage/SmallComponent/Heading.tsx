import style from './Heading.module.css'

export default function Heading(props:{smal:string}) {
    const {smal}=props
    return (
        
            <div className={` position-relative col-sm-7 col-md-6 col-lg-5 col-xl-4 col-9 mx-auto text-center mt-5 mb-5 `}  >
                <span style={{ color: '#c3a070' }}>{smal}</span>
                <h1 data-aos='zoom-in' data-aos-duration='2000' className={`${style.heading} `}  >Featured Rooms</h1>
            </div>
        
    )
}

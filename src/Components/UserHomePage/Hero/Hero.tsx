import { Container } from "react-bootstrap"


export default function Hero() {


    return (
        <div className="container mt-5 mt-lg-2">

        <div className={`col-lg-5 col-md-8  mt-5 mx-auto text-white`} data-aos="fade-right" data-aos-duration="2000">
            <h1> Welcome to Your Sanctuary</h1>
            <p>Discover a world where luxury meets comfort in our exclusive hotel. From elegant accommodations to personalized service, every detail is crafted to make your stay unforgettable.</p>
            <button className="btn mt-3 text-white" style={{backgroundColor:'#a37e4c'}}>Book Your Room</button>
        </div>
        </div>
    )
}

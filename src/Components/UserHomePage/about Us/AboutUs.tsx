import Heading from "../SmallComponent/Heading";
import img from '../../../assets/collage-dz-nord-removebg-preview.png'


export default function AboutUs() {
  return (
    <>
      <div id="about" className="container mt-5 pt-5 pb-5 mb-5">
        <Heading smal={'About Us'} />
        <div className="row mt-5 pt-5">
          <div className="d-md-flex align-items-center">
            <div className="col-md-6">
              <h1 className="mb-3">Why Choose Us</h1>
              <p>
              Welcome to Hani Royal Luxury Hotel , where luxury meets comfort in the heart of the city. At our hotel, every guest is treated like royalty, surrounded by an ambiance that combines elegance with modern sophistication. Whether you're here for a relaxing getaway or a business trip, our dedicated team is committed to making your stay unforgettable. Enjoy our world-class amenities, including sumptuous dining, serene accommodations, and impeccable service
              </p>
            </div>
            <div className="col-md-6 p-2">
              <div>
                <img src={img} style={{width:'100%'}} />
              </div>
            </div>

          </div>
        </div>
      </div>



    </>
  )
}

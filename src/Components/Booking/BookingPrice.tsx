import { useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images-removebg-preview.png';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../ContexStore/Store';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import paidimg from '../../assets/paid-removebg-preview.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendData } from '../Firebase/FirebaseMethod';

export default function BookingPrice() {
  const navigate = useNavigate();
  const contx = useContext(Store);
  const location = useLocation();
  const fnal = location.pathname.split('/')[4];
  let [data, setData] = useState<any>({});
  
 

  useEffect(() => {
    const dat = contx.booking[fnal];
    setData(dat || {});

  }, [location.pathname, contx.booking]);




  const haveValue = Object.keys(data).length > 0;

  const downloadInvoice = () => {
    const input = document.getElementById('invoice') as HTMLElement;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 200;
        const pageHeight = 230;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('invoice.pdf');
      });
    }
  };



  const paid = () => {

    const updatedData = contx.dat.map((val: any) => {
      if (val.roomnumber === fnal) {
        return { ...val, roomstatus: 'booked' };
      }
      return val;
    });

    const obj = updatedData.filter((va: any) => {
      return va.roomnumber == fnal
    })
    const fnlObj =obj[0]
    sendData('rooms',fnlObj,fnal).then(()=>{
     contx.setPriceStatus(true);
     toast.success('Amount is paid');
    }).catch((er)=>{
      console.log(er);
    })
 
  
  };

  const back=()=>{
    contx.setPriceStatus(true);
    navigate('/home')
  }

  return (
    <div className='mb-5'>
      <ToastContainer />
      {haveValue ? (
        <div>
          <div id='invoice'>
            <div className='col-12' style={{ backgroundColor: '#4790f0', height: '8px' }}></div>
            <div className='d-md-flex justify-content-between'>
              <div className='mt-3'>
                <img src={img} width={220} alt="Hotel" />
              </div>
              <div className='mt-4'>
                <h5>Hotel Management Group</h5>
                <p>
                  39 Gold Street, California, USA <br />
                  123-345-537 <br />
                  hotelmanagementgroup@gmail.com <br />
                  hotelmanagementgroup.com
                </p>
              </div>
            </div>
            <hr />
            <div className='d-md-flex position-relative  justify-content-between'>
              <div className='mt-1'>
                <h5>Billed To :</h5>
                <div className='d-flex'>
                  <h6>Name: </h6>
                  <p className='mb-1 ms-2'>{data.name}</p>
                </div>
                <div className='d-flex'>
                  <h6>Address: </h6>
                  <p className='mb-1 ms-2'>{data.address}</p>
                </div>
                <div className='d-flex'>
                  <h6>Number: </h6>
                  <p className='mb-1 ms-2'>{data.number}</p>
                </div>
                <div className='d-flex'>
                  <h6>CNIC: </h6>
                  <p className='mb-1 ms-2'>{data.cnic}</p>
                </div>
              </div>
              {contx.priceStatus && (
                <div className='' style={{right:'0px',top:'50px'}}>
                  <img src={paidimg} width={150} alt="Paid" />
                </div>
              )}
              <div className='mt-1 mt-3 mt-md-0'>
                <div className='d-flex'>
                  <h6>Room Number: </h6>
                  <p className='mb-1 ms-2'>{data.roomnumber}</p>
                </div>
                <div className='d-flex'>
                  <h6>Room Type: </h6>
                  <p className='mb-1 ms-2'>{data.roomtype}</p>
                </div>
                <div className='d-flex'>
                  <h6>Room ID: </h6>
                  <p className='mb-1 ms-2'>{data.roomid}</p>
                </div>
                <div className='d-flex'>
                  <h6>Booking ID: </h6>
                  <p className='mb-1 ms-2'>{data.bookingid}</p>
                </div>
                <div className='d-flex'>
                  <h6>Booking Date: </h6>
                  <p className='mb-1 ms-2'>{data.checkIn}</p>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Room #</th>
                    <th scope="col">Item</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{data.roomnumber}</th>
                    <td>Room</td>
                    <td>{data.roomtype}</td>
                    <td>{data.roomprice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {contx.priceStatus ? (
            <div>
              <button onClick={downloadInvoice} className="btn btn-primary mt-3">Download Invoice</button>
              <button onClick={back} className="btn btn-primary mt-3 ms-3" >Back</button>
            </div>
          ) : (
            <div className='mt-5'>
              <h6>Price Status</h6>
              <button onClick={paid} className='border-0 py-2 px-4 bg-success text-white rounded-5 me-3'>Paid</button>
              <button onClick={() => contx.setPriceStatus(false)} className='border-0 py-2 px-4 bg-danger text-white rounded-5 me-3'>Unpaid</button>
            </div>
          )}
        </div>
      ) : (
        <h2>No data found</h2>
      )}
    </div>
  );
}



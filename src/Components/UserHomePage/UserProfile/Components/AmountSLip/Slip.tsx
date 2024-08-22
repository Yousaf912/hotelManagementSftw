
import html2canvas from 'html2canvas';
import Singleslip from './SingleSlip'
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProfileStore } from '../../../../ContexStore/Store';

export default function Slip() {
    const contx =useContext(ProfileStore)
    const navigate = useNavigate();

    const back = ()=>{
        setTimeout(()=>{
            navigate(`/profile/${contx.id}/bookings`)
        },3000)
    }

    const downloadInvoice = () => {
        back()
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
    
    return (
        <>
          

                <div className=' p-5' id='invoice'>
                    <Singleslip  />
                </div>
                <div className='mb-5 text-center'>
                    <button onClick={downloadInvoice} className='btn text-white' style={{backgroundColor:'#a37e4c'}}>Download</button>
                </div>
        </>
    )
}

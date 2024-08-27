import {  useEffect, useState } from "react";
import CenterElement from "./Components/centerdata/CenterElement"
import {  Store } from "./Components/ContexStore/Store"
import Sidebar from "./Components/Sidebar/Sidebar"
import { getData } from "./Components/Firebase/FirebaseMethod";

function Admin() {
  const [editlist, seteditList] = useState<any>();
  const [showEdit, setShowEdit] = useState(false);
  const [dat, setData] = useState<any>([]);
  const [det, setDet] = useState<any>([]);
  const [adata, setadata] = useState(0);
  const [romNumFB, setRomNumFb] = useState('');
  const [bookingData, setBookingdata] = useState();
  const [booking, setBooking] = useState<any>({});
  const [nestdli, setnestdli] = useState('');
  const [arrow, setarrow] = useState('DashBoard');
  const [priceStatus, setPriceStatus] = useState(false);
  const [delt,setDelt]=useState(false);
  const [editStaf,setEditStaf]=useState(false)
  const [loginId,setLoginId]=useState();
  const [allUsers,setAllUsers]=useState<any>([]);
  const [allBookings,setAllBookings]=useState<any>([]);

  const [allOrders,setAllorders]=useState<any>([]);
  const [allComplains,setAllcomplains]=useState<any>([]);
  const [allServiceRequest,setAllServiceRequest]=useState<any>([])


  useEffect(()=>{

    getData('order').then((order:any)=>{
      const fnal = Object.values(order)
      setAllorders(fnal)
      getData('services').then((res: any) => {
        const fnal = Object.values(res)
        const arr: any[] = [];
        fnal.map((val: any) => {
          const c = Object.values(val)[0];
          arr.push(c)
         setAllServiceRequest(arr)         
        });
      })
      getData('complains').then((res: any) => {
        const fnal = Object.values(res)
        const arr: any[] = [];
        fnal.map((val: any) => {
          const c = Object.values(val)[0];
          arr.push(c)
         setAllcomplains(arr)
         
        });
      })

      
    })




    getData('userdata').then((val:any)=>{
        const fnal = Object.values(val)
        const b = fnal.filter((res:any)=>res.mail != 'admin@gmail.com');
        setAllUsers(b)
        b &&
        b.map((ans:any)=>{
        setAllBookings(ans.booking)
        })
    })
},[])

  

  const [showNavbar, setShowNavbar] = useState(window.innerWidth > 768);
  const handleResize = () => {
    setShowNavbar(window.innerWidth > 575);
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const show=()=>{

  }


  useEffect(() => {
    getData(`booking`).then((res) => {
      setBooking(res)
    }).catch((er) => {
      console.log(er);

    })
  }, [bookingData])


  useEffect(() => {
    getData('rooms').then((data: any) => {
      const finalData = Object.values(data);
      setData(finalData);
      setDet(finalData);
    }).catch((er) => {
      console.log(er);
    });
  }, [showEdit, adata,priceStatus ]);


  const nstdli = (a: any) => {
    setnestdli(a)
  }
  const starow = (e: any) => {
    setarrow(e)
  }

  const obj = {allComplains,allServiceRequest,allOrders,allBookings,allUsers,loginId,setLoginId,editStaf,setEditStaf,delt,setDelt,priceStatus,setPriceStatus, starow, nstdli, arrow, nestdli, booking, bookingData, setBookingdata, romNumFB, setRomNumFb, setadata, editlist, seteditList, showEdit, setShowEdit, dat, setData, det, setDet }

  return (
    <div className="container-fluid">
      <div className="row">
        <Store.Provider value={obj}>
          <div className="d-flex justify-content-between">
            {showNavbar ?
              <div className="col-1 col-sm-4 col-md-3  col-lg-2 mt-2  ">
                <Sidebar />
              </div> :
              <div onClick={show}>
                menue
              </div>}

            <div className=" col-md-8 col-sm-8 ms-sm-3 ms-md-0 col-lg-9  mt-2  ">
              <CenterElement />
            </div>
          </div>
        </Store.Provider>
      </div>
    </div>
  )
}

export default Admin

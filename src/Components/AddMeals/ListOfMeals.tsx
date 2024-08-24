import { useEffect, useState } from 'react'
import style from '../../Components/UserHomePage/UserProfile/Components/Services/Services.module.css'
import { getData } from '../Firebase/FirebaseMethod';
import Loader from '../../Loader';
import { useLocation, useNavigate } from 'react-router-dom';



export default function ListOfMeals() {
  const [option, setoption] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);
  const [food, setFood] = useState<any>([]);
  const navigate =useNavigate()
  const location = useLocation();
  const id =location.pathname.split('/')[2];
  



  useEffect(() => {
    getData('foods').then((val: any) => {
      const fnal = Object.keys(val)
      val &&
        setoption(fnal)
      setAllData(val)
      setFood(val['Breakfast'].items)

    }).catch((er) => {
      console.log(er);

    })
  }, [])


  const getType = (e: any) => {
    const name = e.target.value;
    setFood(allData[name].items)
  }


const confirm = (id2:any,name:any)=>{
navigate(`/profile/${id}/orderfood/order/confirmorder/${id2}/${name}`)
}


  return (
    <>
      {option.length == 0 ?
        <div className='text-center'>
          <Loader></Loader>
        </div> :
        <>
          <div className='p-2  rounded-3' style={{ backgroundColor: '#4790f0' }}>
            <div className='text-center text-white'>
              <h1>Order Food</h1>
            </div>
            <div className=' d-flex justify-content-around  p-2'>
              <div className='d-flex flex-column col-lg-3 bg-white p-2 rounded-3'>
                <h6 > Please Select Food </h6>
                <div className={`${style.selct}`} >
                  <select onChange={getType} >
                    
                    {option.length != 0 && option.map((val: any, i: any) => {
                      return (
                        <option key={i} value={val}>{val}</option>
                      )
                    })}

                  </select>
                </div>
              </div>
            </div>
          </div>



          <div className='row d-flex  flex-wrap justify-content-around mb-5'>
            {food.length != 0 &&
              food.map((val: any, i: any) => {
                return (
                  <div key={i} className={`${style.card} card mt-5 col-sm-5 col-9 col-md-5 col-lg-4 ms-1`} >
                    <img src={val.pic} className={`${style.cardimg}`} alt="..." style={{ height: '200px' }} />
                    <div className="card-body d-flex flex-column justify-content-between">

                      <h5 className="card-title">{val.title}</h5>
                      <p className="card-text">{val.description.slice(0, 130)}</p>
 
                    </div>
                  </div>
                )
              })
            }

          </div>





        </>}
    </>
  )
}


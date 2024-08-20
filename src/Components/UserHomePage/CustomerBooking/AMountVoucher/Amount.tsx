import React, { useContext } from 'react'
import Header from '../../Header/Header'
import { StoreTwo } from '../../../ContexStore/Store'

export default function Amount() {

  const contx = useContext(StoreTwo);
  console.log(contx.isLogin);
  
    
  return (
    <>
    <Header/>
    <div>Amount</div>
    </>
  )
}

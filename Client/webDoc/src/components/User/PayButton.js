import React from 'react'
import { paymentGate } from '../../Helpers/userHelper'

const PayButton = ({items}) => {
    const handleClick = ()=>{
        console.log("Hello");
        paymentGate(items).then((payment)=>{
            console.log(payment);
            if(payment.data.URL){
                window.location.href = payment.data.URL;
            }
        }).catch((err)=>{
            console.log(err);
        })
        
    }
  return (
    <button onClick={handleClick}>PayButton</button>
  )
}

export default PayButton
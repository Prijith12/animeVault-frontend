import axios from "axios";


export const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };
  
export const createOrder=async(amount,receipt,isAuthenticated)=>{
  try{
    const response=await axios.post(`${process.env.REACT_APP_API_URL}/createOrder`,({amount,receipt,isAuthenticated}));
    return response.data
  }catch(err){
    alert(err.message="create order error");
    console.log(err);
  }
}

export const verifyPayment=async(response,isAuthenticated,user,callback)=>{
  try{
    const verification = await axios.post(`${process.env.REACT_APP_API_URL}/verifyPayment`, {
      order_id: response.razorpay_order_id,
      payment_id: response.razorpay_payment_id,
      signature: response.razorpay_signature,
      isAuthenticated,
      user
    });
  callback(verification.data)
  }catch(err){
    alert("Payment is unsuccessfull")
  }

}

import React, { useEffect, useState } from 'react';
import style from '../../style.module.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useAuth0 } from '@auth0/auth0-react';
import { createOrder } from '../../services/paymentService';
import axios from 'axios';
import { loadRazorpayScript } from '../../services/paymentService';
import { verifyPayment } from '../../services/paymentService';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../Context/SearchContext';
const Premium = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [referralCode, setReferralCode] = useState('');
    const [isReferralValid, setIsReferralValid] = useState(false);
    const referal = process.env.REACT_APP_REFERALCODE;
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const { updateIsPremium,isPremium} = useSearchContext(); 
    const navigate=useNavigate()

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleReferralChange = (e) => {
        setReferralCode(e.target.value);
        if (e.target.value == referal) {
            setIsReferralValid(true)
        } else {
            setIsReferralValid(false)
        }

    };

    const handlePayments = async(e) => {
        e.preventDefault();
        if (selectedOption === '99rs') {
            const amount=99
          const result= await createOrder(amount,process.env.REACT_APP_RECEIPT,isAuthenticated);
          handlePayment(result.order,isAuthenticated,user,navigate,updateIsPremium);
        } else {
            if (referralCode !== referal) {
                setIsReferralValid(false);
            } else {
                setIsReferralValid(true);
                const amount=1
                const result= await createOrder(amount,process.env.REACT_APP_RECEIPT,isAuthenticated);
                handlePayment(result.order,isAuthenticated,user,navigate,updateIsPremium);
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadRazorpayScript()
    }, [])
    return (
        <div className={style['background-premium']}>
            <div className="flex flex-col items-center">
                <h1 className='font-bold text-lg mb-7'>Anime Vault Premium</h1>
                <div className={`p-4 border ${selectedOption === '99rs' ? 'border-blue-900' : 'border-gray-300'} rounded-lg mb-4 w-full  min-h-32 bg-gradient-to-br from-yellow-700 to-purple-900`}>
                    <div className='flex justify-center'>
                        <h1 className='text-white font-semibold'>Premium</h1>
                    </div>
                    <label htmlFor="99rs" className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            id="99rs"
                            name="premium"
                            value="99rs"
                            checked={selectedOption === '99rs'}
                            onChange={() => handleOptionChange('99rs')}
                            className="mr-2 cursor-pointer"
                        />
                        <div className='flex flex-col mt-3 ml-3 text-sm'>
                            <li>Lifelong premium membership</li>
                            <li>Includes all premium contents</li>
                            <li>Includes all premium contents</li>
                            <div className='flex justify-end'>
                                <h1 className='text-lg font-bold mr-2'><CurrencyRupeeIcon className='font-semibold' />99</h1>
                            </div>
                        </div>

                    </label>


                </div>
                <div className={`p-4 border ${selectedOption === '1rs' ? 'border-blue-900' : 'border-gray-300'} rounded-lg mb-4 w-full flex flex-col bg-gradient-to-br from-yellow-700 to-purple-600 shadow-md`}>
                    <div className='flex justify-center font-semibold '>
                        <h1>Premium </h1>
                        <div className='bg-yellow-600 text-xs rounded flex items-center ml-4'>
                            Special offer
                        </div>
                    </div>
                    <label htmlFor="1rs" className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            id="1rs"
                            name="premium"
                            value="1rs"
                            checked={selectedOption === '1rs'}
                            onChange={() => handleOptionChange('1rs')}
                            className="mr-2 cursor-pointer"
                        />
                        <div className='flex flex-col mt-3 ml-3 text-sm'>
                            <li>Lifelong premium membership</li>
                            <li>For 1 Rs with the referral code</li>
                            <div className='flex justify-end'>
                                <h1 className='text-lg font-bold mr-2'><CurrencyRupeeIcon className='font-semibold' />1</h1>
                            </div>
                        </div>
                    </label>
                    {selectedOption === '1rs' && (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Enter referral code"
                                value={referralCode}
                                onChange={handleReferralChange}
                                className="border p-2 rounded w-full text-black"
                            />
                            {!isReferralValid && referralCode && <p className="text-red-900 text-sm mt-1 font-semibold">Invalid referral code</p>}
                        </div>
                    )}
                </div>
                <button
                    onClick={handlePayments}
                    className="bg-gradient-to-br from-rose-600 to-purple-900 text-white p-2 rounded mt-4"
                    disabled={!selectedOption || (selectedOption === '1rs' && !isReferralValid)}
                >
                    Proceed with Payment
                </button>
            </div>
        </div>
    );
};


const handlePayment=(response,isAuthenticated,user,navigate,updateIsPremium)=>{
        var options = {
                "key": process.env.REACT_APP_KEY,
                "amount": response.amount,
                "currency": "INR",
                "name": "AnimeVault",
                "description": "Transaction",
                "image": "https://example.com/your_logo",
                "order_id": response.id,
                "handler": function (response) {
                 verifyPayment(response,isAuthenticated,user,(result)=>{
                    updateIsPremium(true)
                    navigate('/')
                 });
            
                },
                "prefill": {
                    "name": "Prijith",
                    "email": "prijith18@.com",
                    "contact": "9037955409"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
    
}

export default Premium;

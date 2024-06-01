import axios from "axios";

export const addWishList=async(isAuthenticated,user,wishListItems)=>{
    try{
        const result=await axios.post(`${process.env.REACT_APP_API_URL}/addWishList`,({
            isAuthenticated,user,wishListItems
        }))
        return result.data;
    }catch(err){
        alert(err)
    }
}

export const removeWishList=async(isAuthenticated,user,mal_id)=>{
    try{
        const result=await axios.post(`${process.env.REACT_APP_API_URL}/removeWishList`,({
            isAuthenticated,user,mal_id
        }))
        return result.data;
    }catch(err){
        alert(err)
    }
}

export const checkIfInWishList=async (isAuthenticated,user,mal_id)=>{
    try{
        const result=await axios.post(`${process.env.REACT_APP_API_URL}/viewWishList`,({
            isAuthenticated,user
        }))
        const wishList=await result.data
        const isInWishList=wishList.some(item=>item.malid== mal_id);
        return isInWishList;
    }catch(err){
        alert(err)
    }
}

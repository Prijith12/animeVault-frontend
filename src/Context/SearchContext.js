import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

export const SearchContext=createContext();
export const useSearchContext=()=>useContext(SearchContext);

export const SearchProvider=({children})=>{
    const [search,setSearch]=useState('');
    const [isPremium,setIsPremium]=useState(false);

    const updateSearch=(data)=>{
        setSearch(data)
    }

    const updateIsPremium=(status)=>{
        setIsPremium(status)
    }
    return(
        <SearchContext.Provider value={{search,updateSearch,isPremium,updateIsPremium}}>
        {children}
    </SearchContext.Provider>
    )


}
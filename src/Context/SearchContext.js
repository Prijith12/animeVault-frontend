import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

export const SearchContext=createContext();
export const useSearchContext=()=>useContext(SearchContext);

export const SearchProvider=({children})=>{
    const [search,setSearch]=useState('');

    const updateSearch=(data)=>{
        setSearch(data)
    }

    return(
        <SearchContext.Provider value={{search,updateSearch}}>
        {children}
    </SearchContext.Provider>
    )


}
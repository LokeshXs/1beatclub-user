
"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useState } from "react";


interface ProviderType{
    isOpen:boolean,
    setIsOpen:Dispatch<SetStateAction<boolean>> 
}


export const MobileNavBarContext = createContext<ProviderType>({
    isOpen:false,
    setIsOpen:()=>{}
});

const MobileNavBarProvider = ({children}:{children:React.ReactNode}) =>{
    const [isOpen,setIsOpen] = useState<boolean>(false);

    return (
        <MobileNavBarContext.Provider value={{isOpen,setIsOpen}}>
            {children}
        </MobileNavBarContext.Provider>
    )
}

export default MobileNavBarProvider;
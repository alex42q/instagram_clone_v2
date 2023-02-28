import React, {useContext, createContext, useState, useEffect} from "react";

interface childrenProps {
    children: JSX.Element;
}

export const LoaderContext = createContext({
    loader:false
})
 
export const useLoader = () => useContext(LoaderContext)

export const LoaderProvider = ({children}: childrenProps) =>{
    const [loader, setLoader] = useState(false)

    useEffect(() =>{
        setLoader(false)
    }, [loader])

    const value = {
        loader:loader
    }

    return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
}
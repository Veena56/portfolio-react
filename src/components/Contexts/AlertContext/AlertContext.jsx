import { createContext, useContext, useState } from "react";

const AlertContext=createContext();
export const useAlert=useContext(AlertContext);
const AlertProvider=({children})=>{
    const [alert,setAlert]=useState({message:"",type:""});
    const showAlert=(message,type=1)=>{
        setAlert({message,type});
        setTimeout(() => 
            setAlert({message:"",type:1})
        , 3000);
    }
    return(
        <AlertContext.Provider value={{showAlert}}>
        {children}
        {alert.message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            backgroundColor: alert.type === 1 ? "#4ade80" : "#f87171",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {alert.message}
        </div>
      )}
        </AlertContext.Provider>
    )
}
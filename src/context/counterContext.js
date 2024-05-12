import { createContext } from "react";

export  let counterContext = createContext()

export default function CounterContextProvider(props){
    let x =6;
    let y= 3;
    return <counterContext.Provider value={{x,y}} >
    {props.children}
    </counterContext.Provider>

}

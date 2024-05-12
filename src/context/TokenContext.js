import { createContext, useState } from "react";

export  let userContext=createContext()
export default function UserContextProvider(myProps){
    const [userToken,setuserToken] = useState(null)
    return <userContext.Provider value={{userToken,setuserToken}}>
    {myProps.children}
    </userContext.Provider>

}

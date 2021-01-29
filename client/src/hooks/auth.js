import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const storageName = 'userData'

    //if localStorage is not empty?
   
    const login = useCallback((token, userId) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem(storageName, JSON.stringify({userId, token}))
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])

 useEffect(()=> {
        const localStoragedata = JSON.parse(localStorage.getItem(storageName)) 
        if(localStoragedata && localStoragedata.token){
            login (localStoragedata.token, localStoragedata.userId)
        
    }
        setReady(!!token)
    }, [login])


    return {login, logout, token, userId, ready}
}
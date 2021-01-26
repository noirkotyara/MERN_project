import { useCallback, useState } from "react"


export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const request = useCallback( async (url, method = 'GET',body = null, headers = {}) => {
             setIsLoading(true)
             try{                
                const response = await fetch(url, {method, body, headers})
                const data = await response.json()
                debugger;
                if(!response.ok){
                    throw new Error(data.message || 'smth wrong')
                }
                setIsLoading(false)
                return data
             }catch(e){
                setIsLoading(false)
                setErrors(e.message)
                //для обработки ошибки в компоненте
                throw e  
                 }
    }, []) 
    const clearErrors = () => setErrors(null)
    return {isLoading, request, errors, clearErrors}
}
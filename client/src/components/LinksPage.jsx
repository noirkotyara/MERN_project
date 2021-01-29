import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useHttp } from "../hooks/http"
import { useMessage } from "../hooks/message"
import { Preloader } from "./common/Preloader"
import LinksTable from './LinksTable'

const LinksPage = () => {
    const { request, loading, clearErrors, errors } = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [linksList, setLinksList] = useState(null)

    useEffect(() => {
        message(errors)
        clearErrors()
    }, [errors, message, clearErrors])

    const getLinksList = useCallback(async () => {
        const response = await request(`/api/link/`, 'GET', null, { Authorization: `Bearer ${auth.token}`, ['Content-Type']: 'application/json' })
        setLinksList(response)

    }, [])
    useEffect(() => {
        getLinksList()
    }, [])

    if (!loading && linksList) {
        return (<div>
            <span>Links Page</span>
            <LinksTable linksList={linksList}/>
        </div>)
    }
    else {
        return <Preloader />
    }

}
export default LinksPage
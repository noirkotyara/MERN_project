import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback, useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useHttp } from "../hooks/http"
import { useMessage } from "../hooks/message"
import { Preloader } from "./common/Preloader"
import LinksTable from './LinksTable'
import * as Icons from '@fortawesome/free-solid-svg-icons';

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
        const response = await request(`/api/link/`, 'GET', null, { Authorization: `Bearer ${auth.token}`, ['Content-Type']: 'application/json' }, auth)
        setLinksList(response)

    }, [])
    useEffect(() => {
        getLinksList()
    }, [])

    if (!loading && linksList) {
        return (<div>
            <h5>Here is your <span style={{textDecoration: "underline"}}>links <FontAwesomeIcon icon={Icons.faArrowDown}/></span> </h5>
            <LinksTable linksList={linksList}/>
        </div>)
    }
    else {
        return <Preloader />
    }

}
export default LinksPage
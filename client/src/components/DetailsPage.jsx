import { useCallback, useContext, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useHttp } from "../hooks/http"
import { useMessage } from "../hooks/message"
import { Preloader } from "./common/Preloader"
import LinkDetails from "./LinkDetails"

const DetailsPage = () => {
    const linkId = useParams().id
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { request, loading, clearErrors, errors } = useHttp()
    const [linkDetails, setLinkDetails] = useState(null)

    useEffect(() => {
        message(errors)
        clearErrors()
    }, [errors, clearErrors, message])

    const getLinkDetails = useCallback(async () => {
        try {
            const response = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${auth.token}` })
            setLinkDetails(response)
        } catch (e) { }
    }, [auth.token, request, linkId])

    useEffect(() => {
        getLinkDetails()
    }, [])

    if (!loading && linkDetails) {
        return (<div>
            <span> Your link`s details</span>
            <LinkDetails linkDetails={linkDetails} />
        </div>)
    }
    return <Preloader />
}
export default DetailsPage
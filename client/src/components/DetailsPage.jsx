import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useHttp } from "../hooks/http"
import { useMessage } from "../hooks/message"
import { Preloader } from "./common/Preloader"
import LinkDetails from "./LinkDetails"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

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
            const response = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${auth.token}` }, auth)
            setLinkDetails(response)
        } catch (e) { }
    }, [auth.token, request, linkId])

    useEffect(() => {
        getLinkDetails()
    }, [])

    if (!loading && linkDetails) {
        return (<div>
            <h5>Your link`s details <span className="btn-floating btn-large black pulse"><FontAwesomeIcon icon={Icons.faInfo} size="lg"/></span> </h5>
            <LinkDetails linkDetails={linkDetails} />
        </div>)
    }
    return <Preloader />
}
export default DetailsPage
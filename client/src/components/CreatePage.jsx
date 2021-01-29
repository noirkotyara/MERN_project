import { Field, Form, Formik } from "formik"
import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useHttp } from "../hooks/http"
import { useMessage } from "../hooks/message"
import { Preloader } from "./common/Preloader"

const CreatePage = () => {
    const { request, errors, loading , clearErrors} = useHttp()
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)

    useEffect(() => {
        message(errors)
        clearErrors()
    }, [errors, clearErrors, message])

    
    const submitHandler = async (event) => {
        //link: ''
        
        try {
            if (event.link) {
                const response = await request(
                    '/api/link/generate',
                    'POST',
                    { from: event.link },
                    { Authorization: `Bearer ${auth.token}`, ['Content-Type']: 'application/json' })
                history.push(`/details/${response.link._id}`)
            }else {
                throw new Error ('link is empty')
            }
        } catch (e) {}
    }
    if(loading){
        return <Preloader/>
    }
    return (<div>
        Create Page
        <div><Formik
            initialValues={{ link: '' }}
            onSubmit={submitHandler}
        >
            <Form>
                <label htmlFor="link">Your link</label>
                <Field
                    id="link"
                    name="link"
                    type="text"
                />
            </Form>
        </Formik>
        </div>

    </div>)
}
export default CreatePage
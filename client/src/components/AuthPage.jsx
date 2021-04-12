import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const AuthPage = () => {
    
    const auth = useContext(AuthContext)
    const [submitButton, setSubmitButton] = useState('')
    const message = useMessage()
    const { isLoading, errors, request, clearErrors } = useHttp()

    useEffect(() => {
        message(errors)
        clearErrors()
    }, [errors, clearErrors, message])

    const submitHandler = async values => {
        try {
            const response = await request(
                `/api/auth/${submitButton}`, //url
                'POST', //method
                { ...values}, //data for server
                { ['Content-Type']: 'application/json' }, auth) //what type of data
            message(response.message)
            auth.login(response.token, response.userId)
        } catch (e) {}
    }
    return (<div>
            <a className="btn-floating btn-large black pulse"><FontAwesomeIcon icon={Icons.faFeatherAlt} size="lg"/></a> 
        <div style={{padding: "1rem"}}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={submitHandler}
            >
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" />
                    <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                    />
                    <div className="row">
                        <div className="col s11 m5" style={{margin: "5px"}}><button disabled={isLoading} className="btn waves-effect waves-teal" type="submit" onClick={() => setSubmitButton('login')}>LogIn</button></div>
                        <div className="col s11 m5" style={{margin: "5px"}}><button disabled={isLoading} className="btn waves-effect waves-teal" type="submit" onClick={() => setSubmitButton('register')}>Registration</button></div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>)
}
export default AuthPage
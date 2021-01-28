import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';

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
            console.log( `/api/auth/${submitButton}: ${JSON.stringify(values)}`)
            const response = await request(
                `/api/auth/${submitButton}`, //url
                'POST', //method
                { ...values}, //data for server
                { ['Content-Type']: 'application/json' }) //what type of data
            message(response.message)
            auth.login(response.token, response.userId)
        } catch (e) {}
    }
    return (<div>
        AuthPage
        <div>
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
                    <button disabled={isLoading} type="submit" onClick={() => setSubmitButton('login')}>LogIn</button>
                    <button disabled={isLoading} type="submit" onClick={() => setSubmitButton('register')}>Registration</button>
                </Form>
            </Formik>
        </div>
    </div>)
}
export default AuthPage
import React, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {Button} from 'antd'

const ForgotPassword = ({history}) =>{
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)

    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
        if( user && user.token )
            history.push('/')
    },[user,history])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        await auth.sendPasswordResetEmail(email,{
            url:process.env.REACT_APP_PASSWORD_REDIRECT_URL,
            handleCodeInApp:true
        })
        .then(()=>{
            setEmail('')
            setLoading(false)
            toast.success('Email sent. Please click link to change password')
        })
        .catch((err)=>{
            setLoading(false)
            toast.error(err.message)
        })
    }

    return(
        <div className="container col-md-6 offset-md-3 p-5">
            {!loading ? <h4>Forgot Password</h4>:<h4>Loading</h4>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                    <input id="emailId" type="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} autoFocus placeholder="name@example.com" />

                    <Button className="mt-4" type="primary" shape="round" block disabled={!email} onClick={handleSubmit}>Send Email</Button>

                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
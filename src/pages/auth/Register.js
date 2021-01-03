import React, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const Register = ({history}) => {

    const [email,setEmail] = useState('');
    
    const {user} = useSelector((state)=>({...state}))
    useEffect(()=>{
        if( user && user.token )
            history.push('/')
    },[user,history])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const config = {
            url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp:true
        }
        await auth.sendSignInLinkToEmail(email,config)

        toast.success(`Email sent to ${email}. Click link to complete registration`);
        window.localStorage.setItem('emailForRegister',email)

        setEmail('')
    }

    const registerForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="emailId">Email address</label>
                <input id="emailId" type="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} autoFocus placeholder="name@example.com" />
            </div>

            <button type="submit" className="mt-3 btn btn-raised btn-success btn-sm" >Register</button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}
export default Register
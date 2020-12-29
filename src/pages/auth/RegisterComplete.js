import React, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'

 // Similar to componentDidMount and componentDidUpdate: useEffect

const RegisterComplete = ({history}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useState(()=>{
        setEmail(window.localStorage.getItem('emailForRegister'))
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
    }

    const completeRegisterForm = () =>(
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <input type="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} disabled />
            </div>

            <div class="form-group">
                <input type="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)} autoFocus placeholder="Enter password"/>
            </div>

            <button type="submit" className="mt-3 btn btn-raised btn-success btn-sm" >Register</button>
            
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registration</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    )
}
export default RegisterComplete
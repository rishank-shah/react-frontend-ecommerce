import React, {useState} from 'react'
import {auth, googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify'
import {Button} from 'antd'
import {GoogleOutlined, MailOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux'

const Login = ({history}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);

    let dispatch = useDispatch()

    const handleGoogleLogin = async()=>{
        auth.signInWithPopup(googleAuthProvider)
        .then(async(result)=>{
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email: user.email,
                    token: idTokenResult.token 
                }
            })
            toast.success('Logged in.')
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)
        try{
            const result = await auth.signInWithEmailAndPassword(email,password)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            dispatch({
                type:'LOGGED_IN_USER',
                payload:{
                    email: user.email,
                    token: idTokenResult.token 
                }
            })
            toast.success('Logged in.')
            history.push('/')
        }catch(error){
            setLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }

    const loginForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-5">
                <input id="emailId" type="email" className="form-control" value={email} onChange={e=> setEmail(e.target.value)} autoFocus placeholder="name@example.com" />
            </div>

            <div className="form-group  mt-4">
                <input id="pass" type="password" className="form-control" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Enter password"/>
            </div>

            <Button onClick={handleSubmit} type="primary" className="mb-3 mt-4" block shape="round" icon={<MailOutlined/>} size="large" disabled={!email || password.length<6 }>
                Login
            </Button>
        </form>
    )

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading?(<h4>Login</h4>):(<h4>Loading</h4>)}
                    {loginForm()}

                    <Button onClick={handleGoogleLogin} type="danger" block shape="round" icon={<GoogleOutlined/>} size="large">
                        Login with google
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Login
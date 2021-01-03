import React,{useState} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import UserNav from '../../components/nav/UserNav'

const Password = () =>{
    const [password1,setPassword1] = useState('')
    const [password2,setPassword2] = useState('')
    const [loading,setLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(password1.length === 0 ||password2.length === 0){
            toast.error('Please Enter all fields')
            return
        }
        if(password1 !== password2){
            toast.error('New password fields should be same.')
            return
        }
        setLoading(true)
        await auth.currentUser.updatePassword(password1)
        .then(()=>{
            setLoading(false)
            setPassword1('')
            setPassword2('')
            toast.success('Password Updated Sucessfully')
        })
        .catch(err=>{
            setLoading(false)
            setPassword1('')
            setPassword2('')
            toast.error(err.message)
        })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>New Password:</label>
                <input type="password" onChange={(e)=>setPassword1(e.target.value)} className="form-control" id="newPassword1" disabled={loading} value={password1} />
            </div>
            <div className="form-group">
                <label>New Password Again:</label>
                <input type="password" onChange={(e)=>setPassword2(e.target.value)} className="form-control" id="newPassword2" disabled={loading} value={password2} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading || !password1 || !password2 || password1.length < 6 || password2.length < 6 || password1!== password2}>Submit</button>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-5">
                    {loading ? <h3 className="text-center mt-4 mb-5 text-danger"> Loading... </h3> : <h3 className="text-center mt-4 mb-5">User Password Update</h3>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password
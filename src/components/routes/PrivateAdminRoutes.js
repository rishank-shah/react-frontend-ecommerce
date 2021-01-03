import React,{useState,useEffect} from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import RedirectLoading from './RedirectLoading'
import {currentAdmin} from '../../api/ServerAuth'

const PrivateAdminRoutes = ({children,...rest}) =>{
    const {user} = useSelector((state)=>({...state}))

    const [success,setSuccess] = useState(false)

    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token)
            .then(_res=>
                setSuccess(true)
            )
            .catch(err=>{
                console.log('admin',err)
            })
        }
    },[user])

    return success ? (
        <Route {...rest} />
    ):(
        <RedirectLoading/>
    )
}

export default PrivateAdminRoutes
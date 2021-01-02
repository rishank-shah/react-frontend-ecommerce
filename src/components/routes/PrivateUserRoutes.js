import React from 'react'
import {Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import RedirectLoading from './RedirectLoading'

const PrivateUserRoutes = ({children,...rest}) =>{
    const {user} = useSelector((state)=>({...state}))
    return user && user.token ? (
        <Route {...rest} render={()=>children} />
    ):(
        <RedirectLoading/>
    )
}

export default PrivateUserRoutes
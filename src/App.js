import React,{useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login' 
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import {auth} from './firebase'
import { useDispatch } from "react-redux";
import ForgotPassword from './pages/auth/ForgotPassword'

const  App = () =>{

  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            email: user.email,
            token: idTokenResult.token 
          }
        })
      }
    })
    return ()=> unsubscribe();
  },[])

  return(
    <>
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
    </Switch>
    </>
  )
}

export default App;
